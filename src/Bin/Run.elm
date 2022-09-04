module Bin.Run exposing (Flags, Msg, Model, main)

{-| Program that runs constantly and uploads events to Conjure. Expects flags in
the form

    {
      "categories": <JSON for categories exported from ActivityWatch>,
      "links": [ <Link> ],
      "settings: <Settings JSON> "
    }


# TEA

@docs Flags, Msg, Model, main

-}

import Category exposing (Category)
import Conjure
import Event
import Iso8601
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Link exposing (Link)
import List.Nonempty as NE exposing (Nonempty(..))
import List.Nonempty.Ancillary as NEA
import Log
import Maybe.Extra as MaybeX
import Measure exposing (Measure)
import Period exposing (Period)
import Platform exposing (Program)
import Query exposing (QueryResult)
import Settings exposing (Settings)
import Task
import Time


{-| Flags are Json, in the form:

    {
      "categories": <JSON for categories exported from ActivityWatch>,
      "links": [ <Link> ],
      "settings: <Settings JSON> "
    }

-}
type alias Flags =
    Encode.Value


{-| Main Msg type.

  - `GotKnownMeasures` -- Received a response from Conjure, either a list of
    `Measure`s or a failure with an error message.
  - `GotMeasurementDeletionResults` -- Received a response from Conjure about
    our measurement deletion mutation, either an error message or the periods
    that were deleted and the time update was as of.
  - `GotMeasurementWriteResults` -- Received a response from Conjure about our
    measurement write mutation, either an error message or the time update was
    as of.
  - `GotQueryResults` -- Received a response from ActivityWatch with query
    results.
  - `GotLocalTime`-- Got local time info on first startup, so rewrite all events
    since the start of the local day.
  - `Tick` -- Time has elapsed since the last time we checked to upload new
    data.

-}
type Msg
    = GotKnownMeasures (Result String (List Measure))
    | GotMeasurementDeletionResults (Result String { forPeriods : Nonempty Period, timeSubmitted : Time.Posix })
    | GotMeasurementWriteResults (Result String Time.Posix)
    | GotQueryResults (Result String QueryResult)
    | GotLocalTime Time.Zone Time.Posix
    | Tick Time.Posix


{-| Main model type.

  - `LoadingMeasures` -- Waiting on a response from Conjure with known
    `Measure`s before `Link`s can be decoded.
  - `Running` -- Uploading events to Conjure.
  - `Exit` -- Exiting the program.

-}
type Model
    = LoadingMeasures
        { categories : Nonempty Category
        , decodeLinks : Nonempty Measure -> Result String (Nonempty Link)
        , settings : Settings
        }
    | Running RunningModel
    | Exit


{-| Main program for aw-conjure-integration, which runs constantly and uploads
events.
-}
main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , subscriptions = subscriptions
        , update = update
        }


{-| Read in flags and send request for `Measure`s.
-}
init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        flagsDecoder : Decoder { categories : Nonempty Category, settings : Settings }
        flagsDecoder =
            Decode.map2 (\categories settings -> { categories = categories, settings = settings })
                (Decode.field "categories" <| Decode.field "categories" <| NEA.decodeArray Category.decoder)
                (Decode.field "settings" Settings.decoder)
    in
    case Decode.decodeValue flagsDecoder flags of
        Ok { categories, settings } ->
            let
                decodeLinks : Nonempty Measure -> Result String (Nonempty Link)
                decodeLinks ms =
                    NEA.decodeArray (Link.decoder categories ms)
                        |> Decode.field "links"
                        |> (\d -> Decode.decodeValue d flags)
                        |> Result.mapError Decode.errorToString
            in
            -- If flags parsed, get known measures from Conjure
            ( LoadingMeasures
                { categories = categories
                , decodeLinks = decodeLinks
                , settings = settings
                }
            , Conjure.getMeasures settings.pat GotKnownMeasures
            )

        Err e ->
            -- If flags failed to parse, exit
            ( Exit
            , String.join "\n" [ "Flags failed to parse with the following error:", Decode.errorToString e ]
                |> Log.error
            )


{-| Subscribes to a heartbeat tick to stay alive when not exiting, as well as
query results.
-}
subscriptions : Model -> Sub Msg
subscriptions m =
    case m of
        LoadingMeasures _ ->
            Sub.none

        Running r ->
            Sub.batch
                [ Query.sub r.categories GotQueryResults
                , -- Once a minute, check if it's time to upload the next batch
                  if r.lastWrite /= Nothing then
                    Time.every 60000 Tick

                  else
                    Sub.none
                ]

        Exit ->
            Sub.none


{-| Main update function.
-}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        LoadingMeasures r ->
            case msg of
                GotKnownMeasures res ->
                    startProgram r res

                _ ->
                    -- This shouldn't happen, but log it in case it does.
                    ( model, Log.warn "Received an unexpected message while loading measures..." )

        Running r ->
            case msg of
                GotKnownMeasures _ ->
                    -- This shouldn't happen, but log it in case it does.
                    ( model, Log.warn "Received measures from Conjure while already running..." )

                GotMeasurementDeletionResults res ->
                    case res of
                        Ok { forPeriods, timeSubmitted } ->
                            ( model
                            , Cmd.batch
                                [ Log.info "Deleted events since start of local day; now reuploading them..."
                                , Query.put r.settings r.categories timeSubmitted forPeriods
                                ]
                            )

                        Err e ->
                            ( Exit
                            , String.join "\n"
                                [ "Measurement deletion failed with the following error:"
                                , e
                                ]
                                |> Log.error
                            )

                GotMeasurementWriteResults res ->
                    case res of
                        Ok timeSubmitted ->
                            ( Running { r | lastWrite = Just timeSubmitted }
                            , String.concat
                                [ "Successfully wrote events as of "
                                , Iso8601.fromTime timeSubmitted
                                , if r.lastWrite == Nothing then
                                    -- First start up, so inform that we're now watching
                                    "\nWatching for new events..."

                                  else
                                    ""
                                ]
                                |> Log.info
                            )

                        Err e ->
                            -- This might be due to a temporary network error, so don't fail catastrophically.
                            ( model
                            , String.join "\n"
                                [ "Measurement write failed with the following error:"
                                , e
                                , "Continuing to run in case this fleeting (e.g. due to a lost internet connection)"
                                ]
                                |> Log.warn
                            )

                GotQueryResults res ->
                    handleQueryResults r res

                GotLocalTime zone now ->
                    rewriteEventsSinceStartOfDay r zone now

                Tick now ->
                    ( model
                    , r.lastWrite
                        |> Maybe.andThen (\lastWrite -> Period.sinceLastCompleteAt r.settings.binSize lastWrite now)
                        |> MaybeX.unwrap Cmd.none (Query.put r.settings r.categories now)
                    )

        Exit ->
            -- This shouldn't happen, but log it in case it does.
            ( model
            , Log.warn "Received a message while exiting..."
            )


{-| Given the results from a query sent to ActivityWatch, handle uploading the
events, if any.
-}
handleQueryResults : RunningModel -> Result String QueryResult -> ( Model, Cmd Msg )
handleQueryResults r res =
    case res of
        Ok { events, timeSubmitted } ->
            let
                ( matched, unmatched ) =
                    NE.toList events
                        |> List.concatMap (List.filter Event.isRelevant << Tuple.second)
                        |> NE.fromList
                        |> Maybe.map (Link.assignEvents r.links)
                        |> Maybe.withDefault ( [], [] )
                        |> Tuple.mapFirst NE.fromList
            in
            ( if matched == Nothing then
                -- Write is "successful" if nothing to write
                Running { r | lastWrite = Just timeSubmitted }

              else
                Running r
            , Cmd.batch
                [ if not r.settings.reportUnmatched || List.isEmpty unmatched then
                    Cmd.none

                  else
                    -- If there are unmatched events and we should log them, then do so
                    Event.sortByDuration unmatched
                        |> List.map Event.viewDetails
                        |> (::) "The following events were unlinked:"
                        |> String.join "\n"
                        |> Log.info
                , case matched of
                    Just es ->
                        NE.map (Tuple.mapFirst Link.to) es
                            |> Conjure.writeMeasurements r.settings (GotMeasurementWriteResults << Result.map (\() -> timeSubmitted))

                    Nothing ->
                        Log.info "No events in the queried period; nothing to do."
                ]
            )

        Err e ->
            -- Something went horribly wrong, so exit.
            ( Exit
            , String.join "\n"
                [ "ActivityWatch query results failed to parse!"
                , e
                , "If this persists, please report it!"
                ]
                |> Log.error
            )


{-| On first launch, we delete all events since the start of the local day and
rewrite them with the new settings (to make it nice for users to test new
configs or just make changes).
-}
rewriteEventsSinceStartOfDay : RunningModel -> Time.Zone -> Time.Posix -> ( Model, Cmd Msg )
rewriteEventsSinceStartOfDay r zone now =
    case Period.sinceStartOfDay r.settings.binSize zone now of
        Just { eras, periods } ->
            ( Running r
            , Cmd.batch
                [ Log.info "Rewriting events since start of day..."
                , Conjure.deleteByEra
                    r.settings
                    (GotMeasurementDeletionResults << Result.map (\() -> { forPeriods = periods, timeSubmitted = now }))
                    (NE.map Link.to r.links)
                    eras
                ]
            )

        Nothing ->
            -- If less than a period past start of day, no need to rewrite anything
            ( Running { r | lastWrite = Just now }
            , Log.info "No periods since the start of day, so not rewriting anything.\nWatching for new events..."
            )


{-| Having received known `Measure`s from Conjure, start the program actually
running.
-}
startProgram : { categories : Nonempty Category, decodeLinks : Nonempty Measure -> Result String (Nonempty Link), settings : Settings } -> Result String (List Measure) -> ( Model, Cmd Msg )
startProgram { categories, decodeLinks, settings } res =
    case res of
        Ok [] ->
            -- No measures, so can't run
            ( Exit
            , "You don't have any Time Entry measures on Conjure!  Make one or more \"Time Entry\" measures here: https://conjure.so/measures/new"
                |> Log.error
            )

        Ok (m :: ms) ->
            -- Given known measures, try to decode links
            case decodeLinks <| Nonempty m ms of
                Ok links ->
                    -- If we got links, then start the program running; catch up events by rewriting since start of day
                    ( Running
                        { categories = categories
                        , links = links
                        , settings = settings
                        , lastWrite = Nothing
                        }
                    , -- Now that we're loaded, catch up events
                      Task.map2 GotLocalTime Time.here Time.now
                        |> Task.perform identity
                    )

                Err e ->
                    -- Couldn't decode the user's links, so we can't run
                    ( Exit
                    , String.join "\n"
                        [ "Decoding links failed with the following error:"
                        , e
                        ]
                        |> Log.error
                    )

        Err e ->
            -- Something went horribly wrong, so exit with error
            ( Exit
            , String.join "\n"
                [ "Fetching known measures from Conjure failed with the following error:"
                , e
                ]
                |> Log.error
            )


{-| The actual model while the program is running.

  - `categories` -- Known `Category`s
  - `links` -- Known `Link`s
  - `settings` -- `Settings`
  - `lastWrite` -- The time at which events were last queried and that query was successfully written.

-}
type alias RunningModel =
    { categories : Nonempty Category
    , links : Nonempty Link
    , settings : Settings
    , lastWrite : Maybe Time.Posix
    }

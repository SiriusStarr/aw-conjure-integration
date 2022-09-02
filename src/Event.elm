module Event exposing
    ( Event
    , binKey
    , isInCategories, isRelevant
    , sortByDuration
    , toMeasurement, viewDetails
    , decoder
    )

{-| The `Event` module defines the `Event` type, representing an "instance" of
time tracked by ActivityWatch, as well as functions for working with it.


# Types

@docs Event


# API Key Values

@docs binKey


# Filtering

@docs isInCategories, isRelevant


# Sorting

@docs sortByDuration


# Conversion

@docs toMeasurement, viewDetails


# JSON Serialization

@docs decoder

-}

import Category exposing (Category, CategoryName)
import Conjure.InputObject as Conjure exposing (MeasurementAttributes)
import FNV1a
import Graphql.OptionalArgument as Optional
import Iso8601
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import List.Nonempty as NE exposing (Nonempty)
import Period
import Settings exposing (GroupBy(..))
import Time


{-| An `Event` is a single instance of time tracked returned by ActivityWatch in
response to a query.

  - `app` -- The name of the application that was focused.
  - `title` -- The title of the application that was focused.
  - `startTime` -- The time the `Event` started.
  - `duration` -- The time in seconds that the `Event` lasted.
  - `category` -- The `Category` that the `Event` was sorted to by
    ActivityWatch.

-}
type Event
    = Event
        { app : String
        , title : String
        , startTime : Time.Posix
        , duration : Float
        , category : CategoryName
        }


{-| The binning key for `Event`s for the Conjure API.
-}
binKey : String
binKey =
    "aw-conjure-integration-era"


{-| Check if an `Event` falls in any of the provided categories.
-}
isInCategories : Event -> Nonempty CategoryName -> Bool
isInCategories (Event { category }) =
    NE.member category


{-| Check if an `Event` has a non-negligible duration, as ActivityWatch
sometimes produces these. In the future, we might want to filter out excessively
short durations as well (e.g. less than a couple of seconds).
-}
isRelevant : Event -> Bool
isRelevant (Event { duration }) =
    duration > 0


{-| Sort a list of `Event`s by decreasing duration.
-}
sortByDuration : List Event -> List Event
sortByDuration =
    let
        decreasingDuration : Event -> Event -> Order
        decreasingDuration (Event e1) (Event e2) =
            compare e2.duration e1.duration
    in
    List.sortWith decreasingDuration


{-| Convert an `Event` into the attributes for a measurement to be sent to the
Conjure API.
-}
toMeasurement : GroupBy -> Event -> { attributes : MeasurementAttributes, key : String, val : String }
toMeasurement groupBy ((Event { startTime, duration, category }) as e) =
    let
        uniqueKeyVal : { key : String, val : String }
        uniqueKeyVal =
            { key = uniqueKey, val = uniqueVal groupBy e }
    in
    { attributes =
        Conjure.buildMeasurementAttributes
            (\r ->
                { r
                    | comment =
                        (case groupBy of
                            Category ->
                                Category.nameToString category

                            AppAndTitle ->
                                viewAppAndTitle e
                        )
                            |> Optional.Present
                    , timestamp =
                        Optional.Present startTime
                    , values =
                        [ ( "duration", Encode.int <| ceiling duration )
                        , ( "active", Encode.bool False )
                        ]
                            |> Encode.object
                            |> Optional.Present
                    , meta =
                        [ Conjure.buildMeasurementableMetaItemAttributes
                            (\r_ ->
                                { r_
                                    | key = Optional.Present uniqueKeyVal.key
                                    , value = Optional.Present uniqueKeyVal.val
                                }
                            )
                        , Conjure.buildMeasurementableMetaItemAttributes
                            (\r_ ->
                                { r_
                                    | key = Optional.Present binKey
                                    , value = Optional.Present <| binVal e
                                }
                            )
                        ]
                            |> Optional.Present
                }
            )
    , key = uniqueKeyVal.key
    , val = uniqueKeyVal.val
    }


{-| Generate the binning value from an `Event` for the Conjure API.
-}
binVal : Event -> String
binVal (Event { startTime }) =
    Period.eraToString <| Period.era startTime


{-| The key for unique values for `Event`s for the Conjure API, so that an
individual event can be updated without a duplicate made.
-}
uniqueKey : String
uniqueKey =
    "aw-conjure-integration-event-id"


{-| Generate the unique value from an `Event` for the Conjure API.
-}
uniqueVal : GroupBy -> Event -> String
uniqueVal groupBy (Event { app, title, startTime, category }) =
    let
        magicNumberDonutSteal : Int
        magicNumberDonutSteal =
            -- An entirely arbitrary salt
            24117
    in
    String.concat
        [ case groupBy of
            Category ->
                FNV1a.hashWithSeed (Category.nameToString category) magicNumberDonutSteal
                    |> String.fromInt

            AppAndTitle ->
                FNV1a.hashWithSeed app magicNumberDonutSteal
                    |> FNV1a.hashWithSeed title
                    |> String.fromInt
        , " - "
        , Iso8601.fromTime startTime
        ]


{-| Turn an `Event` into a detailed string, for user review.
-}
viewDetails : Event -> String
viewDetails ((Event { duration, category }) as e) =
    let
        durationInMinutes : String
        durationInMinutes =
            let
                intDuration : Int
                intDuration =
                    ceiling duration

                sec : Int
                sec =
                    remainderBy 60 intDuration
            in
            String.concat
                [ String.fromInt <| intDuration // 60
                , ":"
                , if sec >= 10 then
                    String.fromInt sec

                  else if sec > 0 then
                    "0" ++ String.fromInt sec

                  else
                    "00"
                ]
    in
    String.concat
        [ Category.nameToString category
        , " ("
        , durationInMinutes
        , "): "
        , viewAppAndTitle e
        ]


{-| Given a list of known `Category`, decode an `Event` from the JSON returned
by ActivityWatch.
-}
decoder : Nonempty Category -> Decoder Event
decoder cs =
    Decode.map5
        (\category app title duration startTime ->
            Event
                { app = app
                , title = title
                , startTime = startTime
                , duration = duration
                , category = category
                }
        )
        (Decode.at [ "data", "$category" ] <| Category.nameDecoder cs)
        (Decode.at [ "data", "app" ] Decode.string)
        (Decode.at [ "data", "title" ] Decode.string)
        (Decode.field "duration" Decode.float)
        (Decode.field "timestamp" Iso8601.decoder)


{-| Print the app and title of an `Event` in a user-readable fashion.
-}
viewAppAndTitle : Event -> String
viewAppAndTitle (Event { app, title }) =
    app ++ " -- " ++ title

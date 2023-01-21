module Conjure exposing
    ( getMeasures
    , writeMeasurements, deleteByEra
    )

{-| The `Conjure` module handles interfacing with the Conjure API.


# Queries

@docs getMeasures


# Mutations

@docs writeMeasurements, deleteByEra

-}

import Authorization exposing (PAT)
import Conjure.InputObject as InputObject
    exposing
        ( MeasurementBatchOperationCreateOrUpdateItemV2Attributes
        , MeasurementBatchOperationDestroyItemV2Attributes
        )
import Conjure.Mutation as Mutation
import Conjure.Object.MeasurementBatchOperationsV2MutationPayload as MeasurementBatchOperationsV2MutationPayload
import Conjure.Query as Query
import CustomScalarCodecs
import Event exposing (Event)
import Graphql.Http exposing (Error, HttpError(..), RawError(..))
import Graphql.Operation exposing (RootMutation, RootQuery)
import Graphql.OptionalArgument as OptionalArgument
import Graphql.SelectionSet as SelectionSet exposing (SelectionSet)
import Json.Decode as Decode
import List.Nonempty as NE exposing (Nonempty)
import Maybe.Extra as MaybeX
import Measure exposing (Measure)
import Period exposing (Era)
import Settings exposing (GroupBy, Settings)
import Url.Builder as Url


{-| Get a list of all time entry `Measure`s for the account on Conjure, or fail
with a string for display to the user. Note that this list will be sorted in the
same order as on the website.
-}
getMeasures : PAT -> (Result String (List Measure) -> msg) -> Cmd msg
getMeasures pat msg =
    Query.measures identity Measure.selectionSet
        |> SelectionSet.map MaybeX.values
        |> sendQuery pat
        |> Cmd.map (msg << Result.map Measure.sort)


{-| Given a root query, create a `Cmd` sending that query to the Conjure API
with proper authorization.
-}
sendQuery : PAT -> SelectionSet decodesTo RootQuery -> Cmd (Result String decodesTo)
sendQuery pat =
    Graphql.Http.queryRequest (Url.crossOrigin "https://api.conjure.so" [ "graphql" ] [])
        >> Authorization.addHeaders pat
        >> Graphql.Http.send
            (Graphql.Http.discardParsedErrorData
                >> Result.mapError errorToString
            )


{-| Given a list of `Measure`s and `Event`s to write to each, send a mutation to
write them to Conjure.
-}
writeMeasurements : Settings -> (Result String () -> msg) -> Nonempty ( Measure, Nonempty Event ) -> Cmd msg
writeMeasurements { groupBy, pat } msg =
    measurementWrite groupBy
        >> sendMutation pat
        >> Cmd.map msg


{-| Given a list of `Measure`s and `Event`s to write to each, create a mutation
to write them to Conjure.
-}
measurementWrite : GroupBy -> Nonempty ( Measure, Nonempty Event ) -> SelectionSet (Maybe { error : Maybe String, success : Bool }) RootMutation
measurementWrite groupBy allEvents =
    let
        allUpdates : List MeasurementBatchOperationCreateOrUpdateItemV2Attributes
        allUpdates =
            NE.concatMap
                (\( m, es ) ->
                    let
                        measureId : CustomScalarCodecs.Id
                        measureId =
                            Measure.getId m
                    in
                    NE.map
                        (\e ->
                            let
                                { attributes, key, val } =
                                    Event.toMeasurement groupBy e
                            in
                            InputObject.buildMeasurementBatchOperationCreateOrUpdateItemV2Attributes
                                { measureId = measureId
                                , match =
                                    [ InputObject.buildMeasurementBatchOperationCreateOrUpdateItemMatchItemV2Attributes
                                        { attribute = "meta"
                                        , value = val
                                        }
                                        (\r ->
                                            { r | key = OptionalArgument.Present key }
                                        )
                                    ]
                                , attributes = attributes
                                }
                        )
                        es
                )
                allEvents
                |> NE.toList
    in
    SelectionSet.map2 (\error success -> { error = error, success = success })
        MeasurementBatchOperationsV2MutationPayload.errorMessage
        MeasurementBatchOperationsV2MutationPayload.success
        |> Mutation.measurementBatchOperationsV2
            { input =
                InputObject.buildMeasurementBatchOperationsV2MutationInput
                    (\r ->
                        { r
                            | clientMutationId = OptionalArgument.Present clientMutationId
                            , createOrUpdate = OptionalArgument.Present allUpdates
                        }
                    )
            }


{-| Given a list of `Measure`s and `Era`s, delete all events in those eras for
those measures.
-}
deleteByEra : Settings -> (Result String () -> msg) -> Nonempty Measure -> Nonempty Era -> Cmd msg
deleteByEra { pat } msg forIds =
    makeMeasurementDeletion forIds
        >> sendMutation pat
        >> Cmd.map msg


{-| Given a list of `Measure`s and `Era`s, create a mutation to delete all
events in those eras for those measures.
-}
makeMeasurementDeletion : Nonempty Measure -> Nonempty Era -> SelectionSet (Maybe { error : Maybe String, success : Bool }) RootMutation
makeMeasurementDeletion measures deleteEras =
    let
        allDeletions : List MeasurementBatchOperationDestroyItemV2Attributes
        allDeletions =
            NE.map
                (\m ->
                    InputObject.buildMeasurementBatchOperationDestroyItemV2Attributes
                        { measureId = Measure.getId m
                        , attribute = "meta"
                        , values = allEras
                        }
                        (\r -> { r | key = OptionalArgument.Present Event.binKey })
                )
                measures
                |> NE.toList

        allEras : List String
        allEras =
            NE.toList <| NE.map Period.eraToString deleteEras
    in
    SelectionSet.map2 (\error success -> { error = error, success = success })
        MeasurementBatchOperationsV2MutationPayload.errorMessage
        MeasurementBatchOperationsV2MutationPayload.success
        |> Mutation.measurementBatchOperationsV2
            { input =
                InputObject.buildMeasurementBatchOperationsV2MutationInput
                    (\r ->
                        { r
                            | clientMutationId = OptionalArgument.Present clientMutationId
                            , destroy = OptionalArgument.Present allDeletions
                        }
                    )
            }


{-| The ID reported to Conjure for mutations.
-}
clientMutationId : String
clientMutationId =
    "aw-conjure-integration"


{-| Convert a network or Graphql error to a human-readable string.
-}
errorToString : Error () -> String
errorToString e =
    case e of
        GraphqlError _ es ->
            "Received a Graphql error from the Conjure server!"
                :: List.map .message es
                ++ [ "Upgrade your aw-conjure-integration version if a new version is available."
                   , "If you're already on the latest version, please report this problem!"
                   ]
                |> String.join "\n"

        HttpError (BadUrl url) ->
            String.join "\n"
                [ "Invalid URL: "
                , url
                , "This should never happen, so please report it!"
                ]

        HttpError Timeout ->
            String.join "\n"
                [ "The Conjure server is taking too long to respond!"
                , "Something is probably wrong with the Conjure server, but if the problem persists, please report it."
                ]

        HttpError NetworkError ->
            "Unable to contact the Conjure server!  Are you connected to the internet?"

        HttpError (BadStatus { statusCode, statusText } _) ->
            String.join "\n"
                [ "Received a bad status code from the server: "
                , String.fromInt statusCode ++ ": " ++ statusText
                , "Something is probably wrong with the Conjure server, but if the problem persists, please report it."
                ]

        HttpError (BadPayload jsonError) ->
            String.join "\n"
                [ "Received an unexpected response from the Conjure server!"
                , Decode.errorToString jsonError
                , "If the problem persists, please report it!"
                ]


{-| Given a root mutation, create a `Cmd` sending that mutation to the Conjure
API with proper authorization.
-}
sendMutation : PAT -> SelectionSet (Maybe { error : Maybe String, success : Bool }) RootMutation -> Cmd (Result String ())
sendMutation pat =
    Graphql.Http.mutationRequest (Url.crossOrigin "https://api.conjure.so" [ "graphql" ] [])
        >> Authorization.addHeaders pat
        >> Graphql.Http.send
            (Graphql.Http.discardParsedErrorData
                >> Result.mapError errorToString
                >> Result.andThen
                    (\r ->
                        case r of
                            Just { error, success } ->
                                case ( success, error ) of
                                    ( True, Just e ) ->
                                        String.join "\n"
                                            [ "The mutation was reported as successful, but the following error message was returned:"
                                            , e
                                            ]
                                            |> Err

                                    ( True, Nothing ) ->
                                        Ok ()

                                    ( False, Just e ) ->
                                        String.join "\n"
                                            [ "Mutation failed with the following error:"
                                            , e
                                            ]
                                            |> Err

                                    ( False, Nothing ) ->
                                        "Mutation was unsuccessful with no error message!  If the problem persists, please report this!"
                                            |> Err

                            Nothing ->
                                Err "No return payload for mutation!  If the problem persists, please report this!"
                    )
            )

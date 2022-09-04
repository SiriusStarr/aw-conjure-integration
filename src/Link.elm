module Link exposing
    ( Link
    , assignEvents
    , to
    , decoder
    , gatherByKey, partitionMap
    )

{-| The `Link` module defines the `Link` type, representing a measure on
Conjure and the categories that it is associated with in ActivityWatch.


# Types

@docs Link


# Categorization

@docs assignEvents


# Properties

@docs to


# Json Serialization

@docs decoder


# For Testing

@docs gatherByKey, partitionMap

-}

import Category exposing (Category, CategoryName)
import Conjure.Scalar
import CustomScalarCodecs
import Event exposing (Event)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import List.Nonempty as NE exposing (Nonempty(..))
import List.Nonempty.Ancillary as NEA
import Maybe.Extra as MaybeX
import Measure exposing (Measure)


{-| A `Link` represents a measure on Conjure and the categories that it is
associated with in ActivityWatch.

  - `from` -- The categories in ActivityWatch from which events will be logged.
  - `to` -- The `Measure` on Conjure to which events will be logged.

-}
type Link
    = Link
        { from : Nonempty CategoryName
        , to : Measure
        }


{-| Given `Link`s and `Events`, match `Event`s to the first matching `Link`,
returning them along with those that did not match any `Link`s.
-}
assignEvents : Nonempty Link -> Nonempty Event -> ( List ( Link, Nonempty Event ), List Event )
assignEvents ms es =
    NE.toList es
        |> partitionMap (\e -> Maybe.map (\m -> ( m, e )) <| assign ms e)
        |> Tuple.mapFirst gatherByKey


{-| Given a list of `Link`s, assign an `Event` to the first matching `Link`, if
any match.
-}
assign : Nonempty Link -> Event -> Maybe Link
assign ms e =
    NEA.find (\(Link { from }) -> Event.isInCategories e from) ms


{-| Access the Conjure measure to which events will be added.
-}
to : Link -> Measure
to (Link l) =
    l.to


{-| Given lists of known categories and Conjure measures, decode a `Link`
from Json.
-}
decoder : Nonempty Category -> Nonempty Measure -> Decoder Link
decoder cs ms =
    Decode.map2 (\from toMeasure -> Link { from = from, to = toMeasure })
        (Decode.field "from" <| NEA.decodeArray (Category.nameDecoder cs))
        (Conjure.Scalar.unwrapCodecs CustomScalarCodecs.codecs
            |> .codecId
            |> (\c ->
                    Decode.andThen
                        (\id ->
                            NEA.find ((==) id << Measure.getId) ms
                                |> MaybeX.unpack
                                    (\() ->
                                        String.join "\n " [ "Unknown measure ID encountered:", Encode.encode 2 (c.encoder id) ]
                                            |> Decode.fail
                                    )
                                    Decode.succeed
                        )
                        c.decoder
               )
            |> Decode.field "to"
        )


{-| Given a list of key-value pairs, gather them together by key.
-}
gatherByKey : List ( k, v ) -> List ( k, Nonempty v )
gatherByKey list =
    let
        go : List ( k, v ) -> List ( k, Nonempty v ) -> List ( k, Nonempty v )
        go l acc =
            case l of
                [] ->
                    List.reverse acc

                ( k, v ) :: xs ->
                    let
                        ( gathered, remaining ) =
                            List.foldr step ( [], [] ) xs

                        step : ( k, v ) -> ( List v, List ( k, v ) ) -> ( List v, List ( k, v ) )
                        step (( k_, v_ ) as x) ( same, diff ) =
                            if k == k_ then
                                ( v_ :: same, diff )

                            else
                                ( same, x :: diff )
                    in
                    go remaining (( k, Nonempty v gathered ) :: acc)
    in
    go list []


{-| Map a list to `Maybe`s, partitioning successes and failures.
-}
partitionMap : (a -> Maybe b) -> List a -> ( List b, List a )
partitionMap f =
    let
        step : a -> ( List b, List a ) -> ( List b, List a )
        step x ( succeeded, failed ) =
            case f x of
                Just fx ->
                    ( fx :: succeeded, failed )

                Nothing ->
                    ( succeeded, x :: failed )
    in
    List.foldr step ( [], [] )

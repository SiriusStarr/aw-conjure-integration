module Bin.ListMeasures exposing (Msg, main)

{-| Program that simply lists available `Measure`s from Conjure. Expects flags
in the form

    { "pat": <Conjure API PAT> }


# TEA

@docs Msg, main

-}

import Authorization exposing (PAT)
import Conjure
import Json.Decode as Decode
import Json.Encode as Encode
import Log
import Measure exposing (Measure)
import Platform exposing (Program)


{-| Main Msg type.

  - `GotKnownMeasures` -- Received a response from Conjure, either a list of
    `Measure`s or a failure with an error message.

-}
type Msg
    = GotKnownMeasures (Result String (List Measure))


{-| Program for simply listing available Conjure measures.
-}
main : Program Encode.Value () Msg
main =
    Platform.worker
        { init = init
        , subscriptions = \_ -> Sub.none
        , update = update
        }


{-| Read in flags and send request for `Measure`s.
-}
init : Encode.Value -> ( (), Cmd Msg )
init fs =
    let
        flags : Result Decode.Error PAT
        flags =
            Decode.field "pat" Authorization.decoder
                |> (\d -> Decode.decodeValue d fs)
    in
    ( ()
    , case flags of
        Ok pat ->
            Conjure.getMeasures pat GotKnownMeasures

        Err err ->
            String.join "\n"
                [ "Flags failed to parse with the following error:"
                , Decode.errorToString err
                ]
                |> Log.error
    )


{-| Main update function.
-}
update : Msg -> () -> ( (), Cmd Msg )
update (GotKnownMeasures res) () =
    ( ()
    , case res of
        Ok [] ->
            "You don't have any Time Entry measures on Conjure!  Make one or more \"Time Entry\" measures here: https://conjure.so/measures/new"
                |> Log.error

        Ok ms ->
            List.map Measure.view ms
                |> String.join "\n"
                |> Log.info

        Err e ->
            "Fetching known measures from Conjure failed with the following error:\n\n"
                ++ e
                |> Log.error
    )

module BinSize exposing
    ( BinSize
    , default
    , inMinutes
    , decoder
    )

{-| The `BinSize` module defines the `BinSize` type, representing a bin size in
minutes within which to group events.


# Types

@docs BinSize


# Creation

@docs default


# Unwrapping

@docs inMinutes


# JSON Serialization

@docs decoder

-}

import Json.Decode as Decode exposing (Decoder)


{-| The resolution (in minutes) by which to bin times. Increasing this will
result in longer contiguous blocks of time uploaded to Conjure.
-}
type BinSize
    = BinSize Int


{-| The default value for bin sizing (15 minutes).
-}
default : BinSize
default =
    BinSize 15


{-| Unwrap a `BinSize` to a number of minutes.
-}
inMinutes : BinSize -> Int
inMinutes (BinSize i) =
    i


{-| Decode a valid `BinSize` from JSON or fail.
-}
decoder : Decoder BinSize
decoder =
    Decode.int
        |> Decode.andThen
            (\i ->
                if i < 5 || i > 60 then
                    Decode.fail <| "Bin size must be 5-60 minutes; got: " ++ String.fromInt i

                else
                    Decode.succeed <| BinSize i
            )

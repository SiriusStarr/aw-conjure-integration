module BinSize exposing
    ( BinSize
    , inMinutes
    , decoder
    , fromMinutes, default
    )

{-| The `BinSize` module defines the `BinSize` type, representing a bin size in
minutes within which to group events.


# Types

@docs BinSize


# Unwrapping

@docs inMinutes


# JSON Serialization

@docs decoder


# For Testing

@docs fromMinutes, default

-}

import Basics.Extra as BasicsX
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Ancillary as DecodeA


{-| The resolution (in minutes) by which to bin times. Increasing this will
result in longer contiguous blocks of time uploaded to Conjure.
-}
type BinSize
    = BinSize Int


{-| Unwrap a `BinSize` to a number of minutes.
-}
inMinutes : BinSize -> Int
inMinutes (BinSize i) =
    i


{-| Decode a valid `BinSize` from JSON or fail.
-}
decoder : Decoder BinSize
decoder =
    DecodeA.mapMaybe fromMinutes "A valid bin size must be between 5 and 60 minutes and evenly divide an hour!" Decode.int


{-| Convert a number of minutes to a `BinSize`, if valid.
-}
fromMinutes : Int -> Maybe BinSize
fromMinutes i =
    if i < 5 || i > 60 || BasicsX.safeRemainderBy i 60 /= Just 0 then
        Nothing

    else
        Just <| BinSize i


{-| A default bin size.
-}
default : BinSize
default =
    BinSize 30

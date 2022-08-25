module Settings exposing
    ( Settings, GroupBy(..)
    , decoder
    )

{-| The `Settings` module defines all settings for aw-conjure-integration.


# Types

@docs Settings, GroupBy


# JSON Serialization

@docs decoder

-}

import BinSize exposing (BinSize)
import Dict
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Ancillary as DecodeA


{-| Settings for aw-conjure-integration.

  - `binSize` -- The bin size to group events within.
  - `groupBy` -- How to group together events, e.g. simply by category or by app
    and title.

-}
type alias Settings =
    { binSize : BinSize
    , groupBy : GroupBy
    }


{-| How to group together events, e.g. simply by category or by app and title.
This also determines what will be written in the comments field on Conjure.
-}
type GroupBy
    = Category
    | AppAndTitle


{-| Decode `Settings` from Json.
-}
decoder : Decoder Settings
decoder =
    Decode.map2 (\binSize groupBy -> { binSize = binSize, groupBy = groupBy })
        (Decode.field "binSize" BinSize.decoder)
        (Decode.field "groupBy" groupByDecoder)


{-| Decode `GroupBy` from Json.
-}
groupByDecoder : Decoder GroupBy
groupByDecoder =
    [ ( "Category", Category )
    , ( "AppAndTitle", AppAndTitle )
    ]
        |> Dict.fromList
        |> DecodeA.lookup

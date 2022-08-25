module CustomScalarCodecs exposing
    ( ISO8601Date, ISO8601DateTime, Id, Json
    , codecs
    )

{-| `CustomScalarCodecs` defines serialization for the scalars that the Conjure
API uses.


# Types

@docs ISO8601Date, ISO8601DateTime, Id, Json


# Serialization

@docs codecs

-}

import Conjure.Scalar
import Iso8601
import Json.Decode as Decode
import Json.Encode as Encode
import Time


{-| An ISO 8601-encoded date
-}
type alias ISO8601Date =
    Conjure.Scalar.ISO8601Date


{-| An ISO 8601-encoded datetime.
-}
type alias ISO8601DateTime =
    Time.Posix


{-| The ID scalar type represents a unique identifier, often used to refetch an
object or as key for a cache. The ID type appears in a JSON response as a
String; however, it is not intended to be human-readable. When expected as an
input type, any string (such as "4") or integer (such as 4) input value will be
accepted as an ID.
-}
type Id
    = Id String


{-| Represents untyped JSON
-}
type alias Json =
    Encode.Value


{-| Codecs for serialization of Conjure's scalar types.
-}
codecs : Conjure.Scalar.Codecs ISO8601Date ISO8601DateTime Id Json
codecs =
    Conjure.Scalar.defineCodecs
        { codecISO8601Date = Conjure.Scalar.defaultCodecs.codecISO8601Date
        , codecISO8601DateTime =
            { encoder = Iso8601.encode
            , decoder = Iso8601.decoder
            }
        , codecId =
            { encoder = \(Id s) -> Encode.string s
            , decoder =
                Decode.map Id Decode.string
            }
        , codecJson =
            { encoder = identity
            , decoder = Decode.value
            }
        }

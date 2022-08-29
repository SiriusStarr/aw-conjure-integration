module Category exposing
    ( Category, CategoryName
    , toQueryFormat, nameToString
    , decoder, nameDecoder
    )

{-| The `Category` module defines the `Category` type, representing a category
from ActivityWatch that has been imported into the integration to categorize
events and be paired with measures.


# Types

@docs Category, CategoryName


# Conversion

@docs toQueryFormat, nameToString


# JSON Serialization

@docs decoder, nameDecoder

-}

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Ancillary as DecodeA
import Json.Decode.Extra as DecodeX
import Json.Encode as Encode
import List.Nonempty as NE exposing (Nonempty)
import List.Nonempty.Ancillary as NEA


{-| ActivityWatch's idea of what a category is.

  - `name` -- The name of the category.
  - `rule` -- The `Rule` by which events are categorized.

-}
type Category
    = Category
        { name : CategoryName
        , rule : Rule
        }


{-| The name of a `Category` known to exist.
-}
type CategoryName
    = CategoryName (Nonempty String)


{-| Convert a `Category` into the format expected by ActivityWatch to categorize
events.
-}
toQueryFormat : Category -> Encode.Value
toQueryFormat (Category { name, rule }) =
    let
        encodeName : CategoryName -> Encode.Value
        encodeName (CategoryName n) =
            NEA.encodeArray Encode.string n

        encodeRule : Rule -> Encode.Value
        encodeRule r =
            case r of
                None ->
                    Encode.object [ ( "type", Encode.string "none" ) ]

                RegularExpression { ignoreCase, pattern } ->
                    (if ignoreCase then
                        [ ( "ignore_case", Encode.bool True ) ]

                     else
                        []
                    )
                        ++ [ ( "type", Encode.string "regex" )
                           , ( "regex", Encode.string pattern )
                           ]
                        |> Encode.object
    in
    Encode.list identity
        [ encodeName name
        , encodeRule rule
        ]


{-| Convert a `CategoryName` for display to the user.
-}
nameToString : CategoryName -> String
nameToString (CategoryName n) =
    NE.toList n
        |> String.join ">"


{-| Decode a `Category` from ActivityWatch's exported Json.
-}
decoder : Decoder Category
decoder =
    Decode.map2
        (\name rule ->
            Category
                { name = CategoryName name
                , rule = rule
                }
        )
        (Decode.field "name" <| NEA.decodeArray DecodeA.nonemptyString)
        (Decode.field "rule" ruleDecoder)


{-| Decode a `Rule` from ActivityWatch's exported Json.
-}
ruleDecoder : Decoder Rule
ruleDecoder =
    Decode.oneOf
        [ Decode.map2
            (\pattern ignoreCase ->
                RegularExpression
                    { ignoreCase = Maybe.withDefault False ignoreCase
                    , pattern = pattern
                    }
            )
            (Decode.field "regex" Decode.string)
            (DecodeX.optionalField "ignore_case" Decode.bool)
            |> DecodeX.when (Decode.field "type" Decode.string) ((==) "regex")
        , Decode.field "type" <| Decode.null None
        ]


{-| Given a list of known `Category`, decode a valid `CategoryName` from Json.
-}
nameDecoder : Nonempty Category -> Decoder CategoryName
nameDecoder cs =
    NEA.decodeArray DecodeA.nonemptyString
        |> Decode.map CategoryName
        |> Decode.andThen
            (\n ->
                if NE.any (\(Category { name }) -> name == n) cs then
                    Decode.succeed n

                else
                    String.join "\n"
                        [ "Unknown category name:"
                        , nameToString n
                        , "Please add it to the list of categories in ActivityWatch (and re-export them)."
                        ]
                        |> Decode.fail
            )


{-| The rule for matching events to the category; currently ActivityWatch only
supports these two types:

  - `None` -- No rule at all.
  - `RegularExpression` -- Matching via a regex, possibly ignoring case.

-}
type Rule
    = None
    | RegularExpression
        { ignoreCase : Bool
        , pattern : String
        }

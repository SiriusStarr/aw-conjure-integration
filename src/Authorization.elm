module Authorization exposing
    ( PAT
    , addHeaders
    , decoder
    )

{-| This module handles authorization with the Conjure API.


# Types

@docs PAT


# Usage

@docs addHeaders


# Json Serialization

@docs decoder

-}

import Graphql.Http
import Json.Decode as Decode exposing (Decoder)


{-| A personal access token for the Conjure API,
[generated here](https://conjure.so/settings/api)
-}
type PAT
    = PAT String


{-| Add authorization headers to a Conjure Graphql request.
-}
addHeaders : PAT -> Graphql.Http.Request decodesTo -> Graphql.Http.Request decodesTo
addHeaders (PAT pat) =
    Graphql.Http.withHeader "Authorization" <| "Bearer " ++ pat


{-| Decode a personal access token from JSON.
-}
decoder : Decoder PAT
decoder =
    Decode.string
        |> Decode.andThen
            (\s ->
                if String.left 6 s == "cnjrp_" && String.length s == 64 then
                    Decode.succeed <| PAT s

                else
                    String.join "\n"
                        [ "Decoded a PAT value:"
                        , s
                        , "that doesn't look right."
                        , "A valid PAT should be 64 characters long and begin with \"cnjrp_\"."
                        , "You can create one at: https://conjure.so/settings/api"
                        ]
                        |> Decode.fail
            )

port module Log exposing (info, error)

{-| A module for simple logging via a port to JS.


# Level

@docs info, error

-}

import Json.Encode as Encode


{-| Send a log message to JS.
-}
port log : Encode.Value -> Cmd msg


{-| Log standard information.
-}
info : String -> Cmd msg
info s =
    log <| Encode.object [ ( "info", Encode.string s ) ]


{-| Log an error, immediately causing the program to exit.
-}
error : String -> Cmd msg
error s =
    log <| Encode.object [ ( "error", Encode.string s ) ]

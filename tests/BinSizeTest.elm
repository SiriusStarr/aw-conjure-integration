module BinSizeTest exposing (fuzzer, suite)

import Basics.Extra as BasicsX
import BinSize exposing (BinSize)
import Expect
import Fuzz exposing (Fuzzer)
import Test exposing (Test, describe, fuzz)


{-| Fuzzer for `BinSize`.
-}
fuzzer : Fuzzer BinSize
fuzzer =
    Fuzz.map
        (BinSize.fromMinutes
            >> Maybe.withDefault BinSize.default
        )
        Fuzz.int


{-| `BinSize` tests.
-}
suite : Test
suite =
    describe "BinSize"
        [ fuzz fuzzer "is always between 5 and 60 minutes" <|
            \b ->
                BinSize.inMinutes b
                    |> Expect.all
                        [ Expect.atLeast 5
                        , Expect.atMost 60
                        ]
        , fuzz fuzzer "evenly divides an hour" <|
            \b ->
                BinSize.inMinutes b
                    |> (\m -> BasicsX.safeRemainderBy m 60)
                    |> Expect.equal (Just 0)
        ]

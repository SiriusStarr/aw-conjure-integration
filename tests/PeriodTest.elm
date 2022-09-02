module PeriodTest exposing (suite)

import Basics.Extra as BasicsX
import BinSize
import BinSizeTest
import Expect
import Fuzz exposing (Fuzzer)
import List.Nonempty as NE
import Period exposing (Era, Period)
import Random
import Test exposing (Test, describe, fuzz, fuzz2, fuzz3)
import Time exposing (utc)
import Time.Extra as TimeX


{-| `Period` tests.
-}
suite : Test
suite =
    describe "Period"
        [ lastCompleteSuite
        , eraSuite
        , sinceStartOfDaySuite
        ]


lastCompleteSuite : Test
lastCompleteSuite =
    describe "lastComplete"
        [ fuzz2 BinSizeTest.fuzzer fuzzTime "ends between (binsize + 1, 1] minutes before current time" <|
            \binSize time ->
                Period.lastComplete binSize time
                    |> Period.end
                    |> Time.posixToMillis
                    |> Expect.all
                        [ Expect.atMost (Time.posixToMillis <| TimeX.add TimeX.Minute -1 utc time)
                        , Expect.greaterThan (Time.posixToMillis <| TimeX.add TimeX.Minute (-1 - BinSize.inMinutes binSize) utc time)
                        ]
        , fuzz2 BinSizeTest.fuzzer fuzzTime "starts between (2 * binSize + 1, binSize + 1] before the current time" <|
            \binSize time ->
                Period.lastComplete binSize time
                    |> Period.start
                    |> Time.posixToMillis
                    |> Expect.all
                        [ Expect.atMost (Time.posixToMillis <| TimeX.add TimeX.Minute (-1 - BinSize.inMinutes binSize) utc time)
                        , Expect.greaterThan (Time.posixToMillis <| TimeX.add TimeX.Minute (-1 - 2 * BinSize.inMinutes binSize) utc time)
                        ]
        , fuzz2 BinSizeTest.fuzzer fuzzTime "is always a bin size in duration" <|
            \binSize time ->
                Period.lastComplete binSize time
                    |> (\p -> TimeX.diff TimeX.Minute utc (Period.start p) (Period.end p))
                    |> Expect.equal (BinSize.inMinutes binSize)
        , fuzz2 BinSizeTest.fuzzer fuzzTime "is always aligned to the Era" <|
            \binSize time ->
                Period.lastComplete binSize time
                    |> Period.start
                    |> TimeX.diff TimeX.Minute utc (Period.eraStart <| Period.era time)
                    |> BasicsX.safeRemainderBy (BinSize.inMinutes binSize)
                    |> Expect.equal (Just 0)
        ]


eraSuite : Test
eraSuite =
    describe "era"
        [ fuzz fuzzTime "is never after the current time" <|
            \time ->
                Period.era time
                    |> Period.eraStart
                    |> Time.posixToMillis
                    |> Expect.atMost (Time.posixToMillis time)
        , fuzz fuzzTime "is always aligned to a UTC hour" <|
            \time ->
                Period.era time
                    |> Period.eraStart
                    |> Time.posixToMillis
                    -- Milliseconds per hour
                    |> remainderBy 3600000
                    |> Expect.equal 0
        ]


sinceStartOfDaySuite : Test
sinceStartOfDaySuite =
    describe "sinceStartOfDay"
        [ fuzz3 BinSizeTest.fuzzer fuzzZone fuzzTime "should not return any value if last complete period is previous day and should return if last complete period is within this day" <|
            \binSize zone time ->
                case Period.sinceStartOfDay binSize zone time of
                    Just _ ->
                        Period.lastComplete binSize time
                            |> Period.start
                            |> Time.posixToMillis
                            |> Expect.atLeast (Time.posixToMillis <| firstEraOfLocalDay zone time)

                    Nothing ->
                        Period.lastComplete binSize time
                            |> Period.end
                            |> Time.posixToMillis
                            |> Expect.atMost (Time.posixToMillis <| firstEraOfLocalDay zone time)
        , fuzz3 BinSizeTest.fuzzer fuzzZone fuzzTime "should cover all time since start of day" <|
            \binSize zone time ->
                case Period.sinceStartOfDay binSize zone time of
                    Just { eras, periods } ->
                        let
                            checkEras : Era -> ( Era, Bool ) -> ( Era, Bool )
                            checkEras e ( lastEra, validSoFar ) =
                                if Period.eraStart e == (TimeX.add TimeX.Hour 1 utc <| Period.eraStart lastEra) then
                                    ( e, validSoFar )

                                else
                                    ( e, False )

                            checkPeriods : Period -> ( Period, Bool ) -> ( Period, Bool )
                            checkPeriods p ( lastPeriod, validSoFar ) =
                                if Period.start p == Period.end lastPeriod then
                                    ( p, validSoFar )

                                else
                                    ( p, False )
                        in
                        Expect.all
                            [ \() ->
                                -- First period should be the start of the first era in the day
                                NE.head periods
                                    |> Period.start
                                    |> Expect.equal (firstEraOfLocalDay zone time)
                            , \() ->
                                NE.tail periods
                                    |> List.foldl checkPeriods ( NE.head periods, True )
                                    |> (\( lastPeriod, acc ) ->
                                            -- Last period should be the currently generated one
                                            acc && lastPeriod == Period.lastComplete binSize time
                                       )
                                    |> Expect.true "Gap in generated periods!"
                            , \() ->
                                -- First era should be the start of the first era in the day
                                NE.head eras
                                    |> Period.eraStart
                                    |> Expect.equal (firstEraOfLocalDay zone time)
                            , \() ->
                                NE.tail eras
                                    |> List.foldl checkEras ( NE.head eras, True )
                                    |> (\( lastEra, acc ) ->
                                            -- Last era should be the current one
                                            acc && lastEra == Period.era time
                                       )
                                    |> Expect.true "Gap in generated eras!"
                            ]
                            ()

                    Nothing ->
                        Expect.pass
        ]
        ]


{-| Find the first era of the day for a zone and time.
-}
firstEraOfLocalDay : Time.Zone -> Time.Posix -> Time.Posix
firstEraOfLocalDay zone time =
    TimeX.floor TimeX.Day zone time
        |> TimeX.ceiling TimeX.Hour utc


{-| Fuzz a time that is at least one day past the epoch.
-}
fuzzTime : Fuzzer Time.Posix
fuzzTime =
    Fuzz.intRange 86400 Random.maxInt
        |> Fuzz.map (\i -> Time.millisToPosix (1000 * i))


{-| Real zones are between UTC−12:00 and UTC+14:00. We'll be more robust and
test weird minute increments, since some offsets aren't whole hours.
-}
fuzzZone : Fuzzer Time.Zone
fuzzZone =
    -- -12 * 60 = -720
    --  14 * 60 =  840
    Fuzz.intRange -720 840
        |> Fuzz.map (\offset -> Time.customZone offset [])

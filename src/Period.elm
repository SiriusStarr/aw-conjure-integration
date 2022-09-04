module Period exposing
    ( Period, Era
    , sinceLastCompleteAt, sinceStartOfDay
    , era, eraToString
    , encodeAsIso8601
    , start, end, eraStart, lastComplete
    )

{-| The `Period` module defines the `Period` type, representing a time period, as
well as functions for working with it.


# Types

@docs Period, Era


# Periods Between

@docs sinceLastCompleteAt, sinceStartOfDay


# Eras

@docs era, eraToString


# JSON Serialization

@docs encodeAsIso8601


# For Testing

@docs start, end, eraStart, lastComplete

-}

import Basics.Extra as BasicsX
import BinSize exposing (BinSize)
import Iso8601
import Json.Encode as Encode
import List.Nonempty as NE exposing (Nonempty(..))
import Time exposing (utc)
import Time.Extra as TimeX
import Unwrap


{-| The `Period` type defines a period of time, during which events may have occurred.
-}
type Period
    = Period { start : Time.Posix, end : Time.Posix }


{-| The Era type defines an entire block of events that can be deleted and
rewritten in the event of the integration being started.
-}
type Era
    = Era Time.Posix


{-| Given a `BinSize`, a time periods were last generated, and the current time,
get a list of any periods that have been completed.
-}
sinceLastCompleteAt : BinSize -> Time.Posix -> Time.Posix -> Maybe (Nonempty Period)
sinceLastCompleteAt binSize lastTime =
    lastComplete binSize lastTime
        |> end
        |> sinceEndOfPeriod binSize


{-| Get a list of all `Era`s and `Period`s since the beginning of the local day,
treating midnight like the beginning of the day.
-}
sinceStartOfDay : BinSize -> Time.Zone -> Time.Posix -> Maybe { eras : Nonempty Era, periods : Nonempty Period }
sinceStartOfDay binSize zone now =
    let
        firstEraOfLocalDay : Time.Posix
        firstEraOfLocalDay =
            TimeX.floor TimeX.Day zone now
                -- Ensure that it is hour-aligned
                |> TimeX.ceiling TimeX.Hour utc
    in
    sinceEndOfPeriod binSize firstEraOfLocalDay now
        |> Maybe.map
            (\ps ->
                { eras =
                    TimeX.diff TimeX.Hour utc firstEraOfLocalDay now
                        |> List.range 1
                        |> Nonempty 0
                        |> NE.map
                            (\e ->
                                TimeX.add TimeX.Hour e utc firstEraOfLocalDay
                                    |> Era
                            )
                , periods = ps
                }
            )


{-| Get the `Era` that a time falls in.
-}
era : Time.Posix -> Era
era t =
    Era <| TimeX.floor TimeX.Hour utc t


{-| Convert an `Era` to a `String`, for sending to Conjure.
-}
eraToString : Era -> String
eraToString (Era t) =
    Iso8601.fromTime t


{-| Encode a `Period` to JSON in a format that ActivityWatch queries will
support, namely ISO 8601 strings separated by a solidus (`/`).
-}
encodeAsIso8601 : Period -> Encode.Value
encodeAsIso8601 (Period p) =
    String.concat [ Iso8601.fromTime p.start, "/", Iso8601.fromTime p.end ]
        |> Encode.string


{-| Get the start time of a `Period`.
-}
start : Period -> Time.Posix
start (Period p) =
    p.start


{-| Get the end time of a `Period`.
-}
end : Period -> Time.Posix
end (Period p) =
    p.end


{-| Get the start time of an `Era`.
-}
eraStart : Era -> Time.Posix
eraStart (Era t) =
    t


{-| Given the current time, return the most recent complete period of the
desired bin size, aligned to the hour. It also includes a minute of additional
fuzz past the end, so that ActivityWatch has a chance to get caught up.
(Queries that end within a few seconds of the current time appear unreliable.)
For example, at 13:43, with bin size of 30 minutes, it will return the period
from 13:00 to 13:30.
-}
lastComplete : BinSize -> Time.Posix -> Period
lastComplete binSize now =
    let
        binSizeInMinutes : Int
        binSizeInMinutes =
            BinSize.inMinutes binSize

        mostRecentHour : Time.Posix
        mostRecentHour =
            TimeX.floor TimeX.Hour utc latestPossibleEnd

        periodsSinceHour : Int
        periodsSinceHour =
            BasicsX.safeIntegerDivide minutesPastHour binSizeInMinutes
                |> Unwrap.maybe

        minutesPastHour : Int
        minutesPastHour =
            TimeX.diff TimeX.Minute utc mostRecentHour latestPossibleEnd

        latestPossibleEnd : Time.Posix
        latestPossibleEnd =
            TimeX.add TimeX.Minute -1 utc now
    in
    if periodsSinceHour < 1 then
        TimeX.add TimeX.Minute -binSizeInMinutes utc mostRecentHour
            |> beginning binSize

    else
        TimeX.add TimeX.Minute ((periodsSinceHour - 1) * binSizeInMinutes) utc mostRecentHour
            |> beginning binSize


{-| Create a period beginning at a time; note that this does not sanity check
that the time is aligned to the bin interval so is only used internally.
-}
beginning : BinSize -> Time.Posix -> Period
beginning binSize startAt =
    Period
        { start = startAt
        , end = TimeX.add TimeX.Minute (BinSize.inMinutes binSize) utc startAt
        }


{-| Given a bin size and the end of a period (it is not checked that this is
aligned to an era plus a multiple of a bin size, so this function is not
exposed), return all periods between that and the last complete one, if any.
-}
sinceEndOfPeriod : BinSize -> Time.Posix -> Time.Posix -> Maybe (Nonempty Period)
sinceEndOfPeriod binSize endOfPeriod now =
    let
        binSizeInMinutes : Int
        binSizeInMinutes =
            BinSize.inMinutes binSize

        periodsSinceLast : Int
        periodsSinceLast =
            TimeX.diff TimeX.Minute utc endOfPeriod latestPeriod.start
                |> (\minuteDiff -> BasicsX.safeIntegerDivide minuteDiff binSizeInMinutes)
                -- This should crash if bin size is zero, since something has gone horribly wrong
                |> Unwrap.maybe

        (Period latestPeriod) =
            lastComplete binSize now
    in
    if periodsSinceLast < 0 then
        Nothing

    else
        List.range 1 periodsSinceLast
            |> Nonempty 0
            |> NE.map
                (\p ->
                    TimeX.add TimeX.Minute (binSizeInMinutes * p) utc endOfPeriod
                        |> beginning binSize
                )
            |> Just

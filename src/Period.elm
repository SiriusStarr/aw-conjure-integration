module Period exposing
    ( Period
    , lastComplete
    , encode
    )

{-| The `Period` module defines the `Period` type, representing a time period, as
well as functions for working with it.


# Types

@docs Period


# Creation

@docs lastComplete


# JSON Serialization

@docs encode

-}

import Basics.Extra as BasicsX
import BinSize exposing (BinSize)
import Iso8601
import Json.Encode as Encode
import Time exposing (utc)
import Time.Extra as TimeX
import Unwrap


{-| The `Period` type defines a period of time, during which events may have occurred.
-}
type Period
    = Period { start : Time.Posix, end : Time.Posix }


{-| Given the current time, return the most recent complete period of the
desired bin size, aligned to the hour. For example, at 13:43, with bin size of
30 minutes, it will return the period from 13:00 to 13:30.
-}
lastComplete : BinSize -> Time.Posix -> Period
lastComplete binSize now =
    let
        binSizeInMinutes : Int
        binSizeInMinutes =
            BinSize.inMinutes binSize

        mostRecentHour : Time.Posix
        mostRecentHour =
            TimeX.floor TimeX.Hour utc now

        periodsSinceHour : Int
        periodsSinceHour =
            BasicsX.safeIntegerDivide minutesPastHour binSizeInMinutes
                |> Unwrap.maybe

        minutesPastHour : Int
        minutesPastHour =
            TimeX.diff TimeX.Minute utc mostRecentHour now
    in
    if periodsSinceHour < 1 then
        TimeX.add TimeX.Minute -binSizeInMinutes utc mostRecentHour
            |> beginning binSize

    else
        TimeX.add TimeX.Minute ((periodsSinceHour - 1) * binSizeInMinutes) utc mostRecentHour
            |> beginning binSize


{-| Encode a `Period` to JSON in a format that ActivityWatch queries will support, namely
ISO 8601 strings separated by a solidus (`/`).
-}
encode : Period -> Encode.Value
encode (Period { start, end }) =
    String.concat [ Iso8601.fromTime start, "/", Iso8601.fromTime end ]
        |> Encode.string


{-| Create a period beginning at a time; note that this does not sanity check
that the time is aligned to the bin interval so is only used internally.
-}
beginning : BinSize -> Time.Posix -> Period
beginning binSize start =
    Period
        { start = start
        , end = TimeX.add TimeX.Minute (BinSize.inMinutes binSize) utc start
        }

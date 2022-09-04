port module Query exposing
    ( put
    , QueryResult, sub
    )

{-| The `Query` module handles interfacing with ActivityWatch, querying it for
events within a period.


# Outgoing

@docs put


# Incoming

@docs QueryResult, sub

-}

import Category exposing (Category)
import Event exposing (Event)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import List.Nonempty exposing (Nonempty)
import List.Nonempty.Ancillary as NEA
import Period exposing (Period)
import Settings exposing (GroupBy(..), Settings)
import Time


{-| Receive the results of a query back from ActivityWatch.
-}
port gotQuery : (Encode.Value -> msg) -> Sub msg


{-| Send a query to ActivityWatch.
-}
port putQuery : Encode.Value -> Cmd msg


{-| Given settings, categories, the current time, and a list of periods, send a
query to ActivityWatch. To get the response, subscribe via `sub`.
-}
put : Settings -> Nonempty Category -> Time.Posix -> Nonempty Period -> Cmd msg
put settings categories now =
    putQuery << encode settings categories now


{-| Given settings, known categories, time submitted, and a list of time periods, create a query
for all events falling in those periods.
-}
encode : Settings -> Nonempty Category -> Time.Posix -> Nonempty Period -> Encode.Value
encode settings categories timeSubmitted timePeriods =
    Encode.object
        [ ( "queryPeriods", NEA.encodeArray Period.encodeAsIso8601 timePeriods )
        , ( "query", buildQuery settings categories )
        , ( "periods", NEA.encodeArray Period.encode timePeriods )
        , ( "timeSubmitted", Encode.int <| Time.posixToMillis timeSubmitted )
        ]


{-| Create the query for ActivityWatch itself in a time-agnostic fashion.
-}
buildQuery : Settings -> Nonempty Category -> Encode.Value
buildQuery { groupBy } cs =
    let
        categoryString : String
        categoryString =
            NEA.encodeArray Category.toQueryFormat cs
                |> Encode.encode 0
    in
    -- Get all events for AFK watcher and window watcher
    [ "afk_events = query_bucket(find_bucket(\"aw-watcher-afk_\"));"
    , "window_events = query_bucket(find_bucket(\"aw-watcher-window_\"));"

    -- Filter events while AFK
    , "window_events = filter_period_intersect(window_events, filter_keyvals(afk_events, \"status\", [\"not-afk\"]));"

    -- Categorize events by categories
    , "categorized_events = categorize(window_events, " ++ categoryString ++ ");"

    -- Sort by timestamp
    , "sorted_events = sort_by_timestamp(categorized_events);"

    -- Group by specified grouping
    , case groupBy of
        Category ->
            "merged_events = merge_events_by_keys(sorted_events, [\"$category\"]);"

        AppAndTitle ->
            "merged_events = merge_events_by_keys(sorted_events, [\"app\", \"title\"]);"

    -- Return results
    , "RETURN = merged_events;"
    ]
        |> Encode.list Encode.string


{-| The results of an `ActivityWatch` query. Note that there may be periods with
no events in them, if no events occurred within those periods.
-}
type alias QueryResult =
    { events : Nonempty ( Period, List Event )
    , timeSubmitted : Time.Posix
    }


{-| Given known categories, subscribe to results from ActivityWacth queries.
-}
sub : Nonempty Category -> (Result String QueryResult -> msg) -> Sub msg
sub categories msg =
    let
        decoder : Decoder QueryResult
        decoder =
            Decode.map2
                (\events timeSubmitted ->
                    { events = events
                    , timeSubmitted = timeSubmitted
                    }
                )
                (Decode.field "eventsByPeriod" <| NEA.decodeArray eventsDecoder)
                (Decode.field "timeSubmitted" <| Decode.map Time.millisToPosix Decode.int)

        eventsDecoder : Decoder ( Period, List Event )
        eventsDecoder =
            Decode.map2 Tuple.pair
                (Decode.field "period" Period.decoder)
                (Decode.field "events" <| Decode.list <| Event.decoder categories)
    in
    Decode.decodeValue decoder
        >> Result.mapError Decode.errorToString
        >> msg
        |> gotQuery

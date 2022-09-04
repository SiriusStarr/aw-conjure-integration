module Query exposing (encode)

{-| The `Query` module handles interfacing with ActivityWatch, querying it for
events within a period.


# Json Serialization

@docs encode

-}

import Category exposing (Category)
import Json.Encode as Encode
import List.Nonempty exposing (Nonempty)
import List.Nonempty.Ancillary as NEA
import Period exposing (Period)
import Settings exposing (GroupBy(..), Settings)


{-| Given settings, known categories, and a list of time periods, create a query
for all events falling in those periods.
-}
encode : Settings -> Nonempty Category -> Nonempty Period -> Encode.Value
encode settings categories timePeriods =
    Encode.object
        [ ( "queryPeriods", NEA.encodeArray Period.encodeAsIso8601 timePeriods )
        , ( "query", buildQuery settings categories )
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

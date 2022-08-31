module LinkTest exposing (suite)

import Dict
import Dict.Extra as DictX
import Expect
import Fuzz exposing (Fuzzer)
import Link
import List.Nonempty as NE
import Test exposing (Test, describe, fuzz)


{-| `Link` tests.
-}
suite : Test
suite =
    describe "Link"
        [ describe "gatherByKey"
            [ fuzz fuzzKeyValList "gathers by key, respecting original list order" <|
                \list ->
                    -- Index list
                    List.indexedMap (\i ( k, v ) -> ( k, ( i, [ v ] ) )) list
                        -- Into dict to associate by key
                        |> DictX.fromListDedupe (\( i1, v1 ) ( _, v2 ) -> ( i1, v1 ++ v2 ))
                        |> Dict.toList
                        -- Sort by original index
                        |> List.sortBy (\( _, ( i, _ ) ) -> i)
                        |> List.map (\( k, ( _, vs ) ) -> ( k, vs ))
                        |> Expect.equalLists (List.map (Tuple.mapSecond NE.toList) <| Link.gatherByKey list)
            ]
        , describe "partitionMap"
            [ fuzz (Fuzz.list Fuzz.int) "is equivalent to ( filterMap, filter (f x == Nothing) )" <|
                \list ->
                    let
                        keepEven : Int -> Maybe Int
                        keepEven i =
                            if remainderBy 2 i == 0 then
                                Just i

                            else
                                Nothing
                    in
                    Link.partitionMap keepEven list
                        |> Expect.equal ( List.filterMap keepEven list, List.filter ((==) Nothing << keepEven) list )
            ]
        ]


{-| Fuzz a list of key-value pairs.
-}
fuzzKeyValList : Fuzzer (List ( Int, Int ))
fuzzKeyValList =
    Fuzz.map2 Tuple.pair
        (Fuzz.intRange -5 5)
        Fuzz.int
        |> Fuzz.list

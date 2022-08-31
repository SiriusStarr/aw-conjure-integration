module Measure exposing
    ( Measure
    , getId
    , sort
    , view
    , selectionSet
    )

{-| The `Measure` module defines the `Measure` type, representing a measure on the Conjure API.


# Types

@docs Measure


# Properties

@docs getId


# Sorting

@docs sort


# Conversion

@docs view


# API

@docs selectionSet

-}

import Conjure.Enum.MeasureType exposing (MeasureType(..))
import Conjure.Object as Conjure
import Conjure.Object.Measure as ConjureMeasure
import CustomScalarCodecs
import Graphql.SelectionSet as SelectionSet exposing (SelectionSet)


{-| A measure as returned by the Conjure API.

  - `id` -- Conjure's ID for the measure.
  - `name` -- The displayed name of the measure.
  - `position` -- The ordering of the measure in the UI of Conjure (lower is
    earlier).

-}
type Measure
    = Measure
        { id : CustomScalarCodecs.Id
        , name : String
        , position : Float
        }


{-| Access the unique ID of a `Measure`.
-}
getId : Measure -> CustomScalarCodecs.Id
getId (Measure { id }) =
    id


{-| Sort a list of `Measure`s by their position, as controlled on the Conjure
website.
-}
sort : List Measure -> List Measure
sort =
    List.sortBy (\(Measure { position }) -> position)


{-| Convert a `Measure` to a human-readable string, with name and ID.
-}
view : Measure -> String
view (Measure { id, name }) =
    name ++ " -- " ++ CustomScalarCodecs.viewId id


{-| A Graphql selection set for a `Measure`, creating one from the information
available via the Conjure API; this returns `Maybe` because only time measures
are valid (and cannot be filtered via the Graphql API).
-}
selectionSet : SelectionSet (Maybe Measure) Conjure.Measure
selectionSet =
    SelectionSet.map4
        (\id name position measureType ->
            case measureType of
                Time_entry ->
                    { id = id
                    , name = name
                    , position = position
                    }
                        |> Measure
                        |> Just

                _ ->
                    Nothing
        )
        ConjureMeasure.id
        ConjureMeasure.name
        ConjureMeasure.position
        ConjureMeasure.measureType

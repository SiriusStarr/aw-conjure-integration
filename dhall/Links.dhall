{-|

# Links

This file defines the type expected for links by `aw-conjure-integration`.

## Usage

Use `make` to define your links like:

```
let Links = ./dhall/Links.dhall

in    [ Links.make
          "meas_firstmeasureid"
          [ [ "Work", "Programming" ], [ "Work", "Accounting" ] ]
      , Links.make "meas_othermeasureid" [ [ "Leisure", "Movies" ] ]
      ]
    : Links.Type

```
Export the file to JSON, e.g. with

```
dhall-to-json --file links.dhall --output ~/.config/aw-conjure-integration/links.json
```

## Notes

Note that this is sensitive to order, i.e. events will be uploaded to the first
measure that they match.

-}
let Link = { to : Text, from : List (List Text) }

let make
    : Text → List (List Text) → Link
    = λ(to : Text) → λ(from : List (List Text)) → { to, from }

in  { Type = List Link, make }

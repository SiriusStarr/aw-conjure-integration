{-|

An example file for making links.  Export the file to JSON, e.g. with

```
dhall-to-json --file links.dhall --output ~/.config/aw-conjure-integration/links.json
```

-}
let Links = ../dhall/Links.dhall

in    [ Links.make
          "meas_firstmeasureid"
          [ [ "Work", "Programming" ], [ "Work", "Accounting" ] ]
      , Links.make "meas_othermeasureid" [ [ "Leisure", "Movies" ] ]
      ]
    : Links.Type

{-|

An example file for making settings.  Export the file to JSON, e.g. with

```
dhall-to-json --file settings.dhall --output ~/.config/aw-conjure-integration/settings.json
```
-}
let Settings = ../dhall/Settings.dhall

in  Settings::{
    , groupBy = Settings.GroupBy.AppAndTitle
    , pat = "cnjrp_1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    }

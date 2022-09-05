{-|

# Settings

This file defines the type expected for settings by `aw-conjure-integration`.

## Usage

Use record completion to define your settings like:

```
let Settings = ./dhall/Settings.dhall

in  Settings::{
    , groupBy = Settings.GroupBy.AppAndTitle
    , pat = "cnjrp_1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    }
```
Export the file to JSON, e.g. with

```
dhall-to-json --file settings.dhall --output ~/.config/aw-conjure-integration/settings.json
```

## Options

### GroupBy

* `Category` (default) -- Group events that share the same category together
  before uploading them to Conjure.  This protects your privacy (by ensuring app
  and title info is never sent to Conjure) and cuts down on the number of
  measurements per period created.
* `AppAndTitle` -- Group together events that share the same app and title. This
  will upload this higher-resolution data to Conjure and puts such usage data
  into Conjure (which may be a privacy concern for you).

### Bin Size

`aw-conjure-integration` works on the basis of periods of time, within which
similar events are grouped together, to avoid creating thousands of entries on
Conjure as you alt-tab between windows.  By default, this is **30 minutes**, but
it may be changed in the range from 5–60 minutes, provided that the value evenly
divides an hour.  Decreasing the value produces finer resolution time tracking
and more "responsive" time tracking at the expense of having more measurements
on Conjure.  Note that no events are uploaded until at least 1 minute past the
end of a period, e.g. if you use the default 30 minute periods, events will be
uploaded at about 12:01, 12:31, 1:01, 1:31, etc., whereas with 10 minute
periods, they would be uploaded at 12:01, 12:11, 12:21, 12:31, etc.

### PAT

Your Personal Access Token for the Conjure API.  You can make a new one
[here](https://conjure.so/settings/api).  No value is provided for this by
default, as it is unique to each user.

### Report Unmatched

Whether or not (the default) to report events that do not match any links. These
unmatched events will be logged at each upload cycle.  If you don't have many
links set up, this is a good way to get ideas for new categories/links.

-}
let GroupBy = < Category | AppAndTitle >

in  { Type =
        { groupBy : GroupBy
        , binSize : Natural
        , pat : Text
        , reportUnmatched : Bool
        }
    , default =
      { groupBy = GroupBy.Category, binSize = 30, reportUnmatched = False }
    , GroupBy
    }

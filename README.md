# `aw-conjure-integration`

* [`aw-conjure-integration`](#aw-conjure-integration)
  * [Concepts](#concepts)
    * [Events](#events)
    * [Categories](#categories)
    * [Measures](#measures)
    * [Links](#links)
  * [Initial Setup/Configuration](#initial-setupconfiguration)
  * [Limitations](#limitations)
  * [Acknowledgments](#acknowledgments)

## Concepts

Below are a quick explanation of the terms you'll need to understand to set up
this integration.

### Events

**Events** are units of time as tracked by ActivityWatch, e.g. time spent in the
"Firefox" app with some window title.

### Categories

**Categories** are simply the categories you can define in ActivityWatch for
classifying time.  For example, by default, ActivityWatch comes with things like
`["Work","Programming"]` for the regex
`GitHub|Stack Overflow|BitBucket|Gitlab|vim|Spyder|kate|Ghidra|Scite`.
You can define more, edit, or delete them in your ActivityWatch settings
interface, which is probably located [here](http://localhost:5600/#/settings)
(unless you're running on a non-standard port).  ActivityWatch uses these
**Categories** to categorize **Events**.

### Measures

**Measures** are simply `Time Entry` measures on Conjure.

### Links

**Links** are the only "new" concept in this integration.  A link is simply one
or more **Categories** in ActivityWatch and a single **Measure** on Conjure.
This integration will then automatically upload **Events** that match those
categories to that measure on Conjure.

## Initial Setup/Configuration

Note that the `aw-conjure-integration` config folder should be located here:

* Linux: `~/.config/aw-conjure-integration` (or
  `$XDG_CONFIG_HOME/aw-conjure-integration`)
* macOS: `~/Library/Preferences/aw-conjure-integration`
* Windows: `%APPDATA%\aw-conjure-integration\Config`

1. Create `settings.json` in the aforementioned config folder and define your
   settings.
   1. You can do this manually, by copying over and editing
      [./config-example/settings.json](./config-example/settings.json), or using
      the Dhall configuration language as with the example at
      [./config-example/settings.dhall](./config-example/settings.dhall) and
      running `dhall-to-json`.  If you don't know what Dhall is, don't worry
      about it, just use the aforementioned JSON file.
   2. Create a Personal Access Token (PAT) on Conjure
      [here](https://conjure.so/settings/api).  You can name it "ActivityWatch
      Integration" or whatever you like (but something you'll remember is
      associated with this integration).  Replace the placeholder token in your
      `settings.json` with this token (or write it down for later use), as
      Conjure will only show it to you once.
2. Set up and export your categories from the ActivityWatch web interface. (The
   option should be [here](http://localhost:5600/#/settings), unless you're
   running on a non-standard port.)  Place the JSON file in the config folder.
   **This step will need to be repeated any time you change your categories.**
3. Create `links.json` in the config folder and define your links.
   1. Create any time measures on Conjure you'd like to link to ActivityWatch
   (if you haven't already).  New measures can be created
   [here](https://conjure.so/measures/new); note that they **must** be of type
   `Time Entry`.
   2. Now you'll need the ID's of the measures.  You can get them conveniently
      by running `aw-conjure-integration --list-measures`; this will print out a
      list of measures and their associated ID's (which look like this:
      `meas_A1pHanUM3r1c`).
   3. Create links as you desire.  You can do this manually, by copying over and
      editing [./config-example/links.json](./config-example/links.json), or
      using the Dhall configuration language as with the example at
      [./config-example/links.dhall](./config-example/links.dhall) and
      running `dhall-to-json`.  If you don't know what Dhall is, don't worry
      about it, just use the aforementioned JSON file.
   4. You can have as many links as you'd like and can freely add/delete more
      in the future by editing this file.
4. You're done!  Simply run the program now with `aw-conjure-integration`, and
   it will upload your time without further intervention on your part.  (You'll
   need to restart it if you close it or you restart your computer.)

## Limitations

* Conjure measures have to be manually created on the
  [website](https://conjure.so/measures/new).  This isn't likely to change,
  since it isn't something that one has to do terribly often, and it doesn't
  seem it would be more convenient via this integration than in Conjure itself.
* Conjure measures have to be referenced by ID, not name.  This is to allow you
  to freely rename measures in Conjure without having to tweak the config of
  this integration and so is more of a feature.
* Categories have to be manually exported from ActivityWatch.  This is sadly a
  limitation of ActivityWatch itself, as they don't reside anywhere except
  nebulously in the web interface.  If they become accessible via another
  manner, this will definitely be changed.
* Currently, this integration only supports the `aw-watcher-window` (and
  `aw-watcher-afk`)
  [watchers](https://docs.activitywatch.net/en/latest/watchers.html).  If there
  is a desire for them, additional watchers could be added.

## Acknowledgments

Thanks to [@Whelton](https://github.com/Whelton) for help with the Conjure API
(and for making Conjure)!

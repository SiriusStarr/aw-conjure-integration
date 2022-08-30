# `aw-conjure-integration`

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

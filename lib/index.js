import { AWClient } from 'aw-client'
import listMeasures from './list-measures.cjs'
import { XMLHttpRequest } from './xmlhttprequest.cjs'

// Work around the fact that Elm doesn't like node
global.XMLHttpRequest = XMLHttpRequest

export class AWConjureIntegration {
  listMeasures ({ settings }) {
    // Run compiled Elm code
    const main = listMeasures.Elm.Bin.ListMeasures.init({
      flags: { pat: settings.pat }
    })

    // Subscribe to Elm logging
    main.ports.log.subscribe(log)
  }

  init () {
    // ActivityWatch client library
    const client = new AWClient('aw-conjure-integration')

    // Run compiled Elm code
    const main = elm.Elm.Main.init({
      flags: {
        categories: this.categories,
        measures: this.measures,
        binSize: this.binSize
      }
    })

    // Subscribe to Elm logging
    main.ports.log.subscribe(log)

    // Transfer queries from Elm to aw-client and send the results back
    main.ports.putQuery.subscribe(async q => {
      main.ports.gotQuery.send(await client.query(q.timePeriods, q.query))
    })
  }
}

function log ({ info, warn, error }) {
  if (!(info === undefined)) {
    console.log(info)
  }
  if (!(error === undefined)) {
    console.error(error)
    process.exit(1)
  }
}

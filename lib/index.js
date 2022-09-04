import { AWClient } from 'aw-client'
import run from './run.cjs'
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

  run ({ categories, links, settings }) {
    // ActivityWatch client library
    const client = new AWClient('aw-conjure-integration')

    // Run compiled Elm code
    const main = run.Elm.Bin.Run.init({
      flags: {
        categories,
        links,
        settings
      }
    })

    // Subscribe to Elm logging
    main.ports.log.subscribe(log)

    // Transfer queries from Elm to aw-client and send the results back
    main.ports.putQuery.subscribe(
      async ({ queryPeriods, query, periods, timeSubmitted }) => {
        // Get events from ActivityWatch for the periods
        const eventsByPeriod = await client.query(queryPeriods, query)
        main.ports.gotQuery.send({
          // Pair events with their periods
          eventsByPeriod: eventsByPeriod.map((es, i) => ({
            period: periods[i],
            events: es
          })),
          // Send the time submitted back to Elm
          timeSubmitted
        })
      }
    )
  }
}

function log ({ info, warn, error }) {
  if (!(info === undefined)) {
    console.log(info)
  }
  if (!(warn === undefined)) {
    console.log(warn)
  }
  if (!(error === undefined)) {
    console.error(error)
    process.exit(1)
  }
}

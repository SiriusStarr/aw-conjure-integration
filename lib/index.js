import { AWClient } from 'aw-client'
import elm from './main.cjs'
import { XMLHttpRequest } from './xmlhttprequest.cjs'

// Work around the fact that Elm doesn't like node
global.XMLHttpRequest = XMLHttpRequest

export class AWConjureIntegration {
  constructor ({ categories, measures, binSize = 15 }) {
    this.categories = categories
    this.measures = measures
    this.binSize = binSize
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

    // Subscribe to stdout/stderror
    main.ports.printStdout.subscribe(s => {
      console.log(s)
    })
    main.ports.fatalError.subscribe(s => {
      console.error(s)
      process.exit(1)
    })

    // Transfer queries from Elm to aw-client and send the results back
    main.ports.putQuery.subscribe(async q => {
      main.ports.gotQuery.send(await client.query(q.timeperiods, q.query))
    })
  }
}

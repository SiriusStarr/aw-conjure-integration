import { AWClient } from 'aw-client'
import elm from './main.cjs'
import envPaths from 'env-paths'
import fs from 'fs'
import path from 'path'
import xhr2 from 'xhr2'

// ActivityWatch client library
const client = new AWClient('aw-conjure-integration')

// Work around the fact that Elm doesn't like node
globalThis.XMLHttpRequest = xhr2

// Config file path
const configDir = envPaths('aw-conjure-integration', { suffix: '' }).config

// Create config dir if it doesn't exist
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true })
}

// Read in categories file
fs.readFile(path.join(configDir, 'aw-category-export.json'), (err, data) => {
  // Fail with fatal error if categories file couldn't be read
  if (err) {
    console.error(err)
    console.error(
      'Could not open categories file; please export it from the web interface of ActivityWatch and place it in: ' +
        configDir
    )
    process.exit(1)
  }

  // Parse categories JSON or fail with fatal error
  let categories
  try {
    categories = JSON.parse(data)
  } catch (e) {
    console.error(e)
    console.error(
      'Categories JSON failed to parse; please re-export it from the web interface of ActivityWatch.'
    )
    process.exit(1)
  }

  // Run compiled Elm code
  const main = elm.Elm.Main.init({ flags: { categories } })

  // Subscribe to stdout/stderror
  main.ports.printStdout.subscribe(function (s) {
    console.log(s)
  })
  main.ports.fatalError.subscribe(function (s) {
    console.error(s)
    process.exit(1)
  })

  // Transfer queries from Elm to aw-client and send the results back
  main.ports.putQuery.subscribe(function (q) {
    client.query(q.timeperiods, q.query).then(main.ports.gotQuery.send)
  })
})

import { Command, Option, InvalidArgumentError } from 'commander'
import envPaths from 'env-paths'
import fs from 'fs'
import path from 'path'
import { AWConjureIntegration } from '../lib/index.js'

// Clean up exception logging a bit
process.on('uncaughtException', ({ message }) => {
  console.error(message)
  process.exit(1)
})

// Set process name
process.title = 'aw-conjure-integration'

// Config file path
const configDir = envPaths('aw-conjure-integration', { suffix: '' }).config

// Create config dir if it doesn't exist
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true })
}

// Setup CLI
const program = new Command()

// Program name and version
program
  .name('aw-conjure-integration')
  .description('ActivityWatch integration for conjure.so')
  .version('1.0.0')

// Categories file option and default location
program.addOption(
  new Option('-c, --categories <path>', 'path to the categories file').default(
    path.join(configDir, 'aw-category-export.json'),
    path.join(
      'XDG_CONFIG_HOME',
      'aw-conjure-integration',
      'aw-category-export.json'
    )
  )
)

// Settings file option and default location
program.addOption(
  new Option('-s, --settings <path>', 'path to the settings file').default(
    path.join(configDir, 'settings.json'),
    path.join('XDG_CONFIG_HOME', 'aw-conjure-integration', 'settings.json')
  )
)

// PAT argument option
program.addOption(
  new Option(
    '-p, --pat <PAT>',
    "conjure.so Personal Access Token (if you don't want to include it in the config file)"
  )
)

// Bin Size argument option
program.addOption(
  new Option(
    '-b, --bin-size <minutes>',
    "Period in minutes to bin together related events (if you don't want to include it in the config file)"
  ).argParser(parseBinSize)
)

// Group by argument option
program.addOption(
  new Option(
    '-g, --group-by <Category|AppAndTitle>',
    "whether to group events by category or by app and title  (if you don't want to include it in the config file)"
  ).choices(['Category', 'AppAndTitle'])
)

// Report unmatched flag
program.option(
  '-u, --report-unmatched',
  "report unmatched events (if you don't want to include it in the config file)"
)

// Links file option and default location
program.addOption(
  new Option('-l, --links <path>', 'path to the links file')
    .default(
      path.join(configDir, 'links.json'),
      path.join('XDG_CONFIG_HOME', 'aw-conjure-integration', 'links.json')
    )
    .conflicts('list-measures')
)

// Flag to simply list measures and exit
program.addOption(
  new Option(
    '--list-measures',
    'list available measures from conjure.so along with their IDs and exit'
  ).conflicts('links')
)

// Parse options from CLI
program.parse()
const options = program.opts()

// Parse settings file, if it exists, and add in options
const settings = makeSettings(options)

// Now that all options are read in, run program
const main = new AWConjureIntegration()

if (options.listMeasures) {
  // Just list measures if instructed to
  main.listMeasures({ settings })
} else {
  // Otherwise, parse in categories and links and run program
  main.run({
    categories: readAndParse(options.categories),
    links: readAndParse(options.links),
    settings
  })
}

// Attempt to read and parse as JSON the file at a path or throw a descriptive exception
function readAndParse (path) {
  let rawData

  try {
    rawData = fs.readFileSync(path)
  } catch ({ message }) {
    // Fail with fatal error if file couldn't be read
    throw new Error(message + '\n\nCould not open file at: ' + path)
  }

  // Parse JSON or fail with fatal error
  try {
    return JSON.parse(rawData)
  } catch ({ message }) {
    throw new Error(message + '\n\nCould not parse JSON from file at: ' + path)
  }
}

// Load settings file and overwrite with CLI flags
function makeSettings ({ binSize, groupBy, pat, reportUnmatched }) {
  let settings = {}

  // Load settings file, if it exists, or inform the user it doesn't
  try {
    settings = readAndParse(options.settings)
  } catch ({ message }) {
    console.log(message)
  }

  // Overwrite settings with CLI flags, if any have been set
  return {
    ...settings,
    ...(binSize !== undefined && { binSize }),
    ...(groupBy !== undefined && { groupBy }),
    ...(pat !== undefined && { pat }),
    ...(reportUnmatched !== undefined && { reportUnmatched })
  }
}

// Parse a valid bin size
function parseBinSize (v) {
  // Parse it as an int
  const b = parseIntArg(v)

  // Check that it is a valid bin size
  if (b < 5 || b > 60 || 60 % b !== 0) {
    throw new InvalidArgumentError(
      'A valid bin size must be between 5 and 60 minutes and evenly divide an hour!'
    )
  }

  return b
}

// Parse an argument that should be an integer
function parseIntArg (v) {
  // Parse it as base 10
  const asInt = parseInt(v, 10)

  // If it isn't a number, it's wrong
  if (isNaN(asInt)) {
    throw new InvalidArgumentError('Not a number!')
  }

  // If parsing it as a float returns something else, it's not an integer
  if (parseFloat(v) !== asInt) {
    throw new InvalidArgumentError('Not an integer!')
  }

  return asInt
}

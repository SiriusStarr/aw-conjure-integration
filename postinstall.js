// Only run elm-tooling postinstall when not in production

if (process.env.NODE_ENV !== 'production') {
  const elmToolingCli = await import('elm-tooling')

  elmToolingCli.default(['install']).then(
    exitCode => {
      console.log('Exit', exitCode)
      process.exit(exitCode)
    },

    error => {
      console.error('Unexpected error', error)
      process.exit(1)
    }
  )
}

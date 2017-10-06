// Set module root directory and define a custom require function
require('app-module-path').addPath(`${__dirname}/app`)

// Enable monitoring
if (process.env.NODE_ENV === 'production') {
  require('newrelic')
}

require('core/bootstrap')()

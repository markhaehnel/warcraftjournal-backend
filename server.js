// Set module root directory and define a custom require function
require('app-module-path').addPath(`${__dirname}/app`)

// Enable monitoring
require('newrelic')

require('core/bootstrap')()

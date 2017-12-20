const path = require('path')

// Set module root directory and define a custom require function
require('app-module-path').addPath(path.join(__dirname, '..'))

require('api/core/bootstrap')()

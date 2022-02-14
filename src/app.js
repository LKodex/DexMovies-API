// Enviroment variables
process.env.API_MAJOR = 0
process.env.API_MINOR = 0
process.env.API_PATCH = 0
require('dotenv/config')

// Creates the app
const app = require('express')()

// Import app middlewares
const bodyParser = require('body-parser')
const requestLogger = require('./middlewares/requestLogger')
const internalErrorHandler = require('./middlewares/internalErrorHandler')
const unusedEndpointHandler = require('./middlewares/unusedEndpointHandler')

// Apply the middlewares in the app
app.use(bodyParser.json())
app.use(requestLogger)

// Handle endpoints
require('./routes/usersRoute')(app)
require('./routes/moviesRoute')(app)
require('./routes/charactersRoute')(app)

// Apply the middlewares in the app
app.use(internalErrorHandler)
app.use(unusedEndpointHandler)

// Start app
app.listen(process.env.SRV_PORT, process.env.SRV_HOST, () => {
    console.log(`Server listening... http://${process.env.SRV_HOST}:${process.env.SRV_PORT}/`)
})

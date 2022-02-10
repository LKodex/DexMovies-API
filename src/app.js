require('dotenv/config')

const app = require('express')()
const bodyParser = require('body-parser')
const requestLogger = require('./util/requestLogger')
const requestResponser = require('./util/requestResponser')

app.use(bodyParser.json())

// Handle used endpoints
require('./routes/moviesRoute')(app)
require('./routes/charactersRoute')(app)

// Handle internal errors
app.use((error, request, response, next) => {
    requestLogger(request)
    requestResponser(response, { statusCode: 500, message: 'An internal error occurred', authorized: false }, { error: error })
})

// Handle unused endpoints
app.use((request, response, next) => {
    requestLogger(request)
    requestResponser(response, { statusCode: 404, message: 'Endpoint not found', authorized: false })
})

// Start app
app.listen(process.env.SRV_PORT, process.env.SRV_HOST, () => {
    console.log(`Server listening... http://${process.env.SRV_HOST}:${process.env.SRV_PORT}/`)
})
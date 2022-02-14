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
app.use(internalErrorHandler)
app.use(unusedEndpointHandler)

// Handle endpoints
require('./routes/moviesRoute')(app)
require('./routes/charactersRoute')(app)

// Start app
app.listen(process.env.SRV_PORT, process.env.SRV_HOST, () => {
    console.log(`Server listening... http://${process.env.SRV_HOST}:${process.env.SRV_PORT}/`)
})

/*
F Transformar requestLogger em um middleware
x Criar Usuários
x Salvar Hash SHA3-256 da Senha
x Autenticar usuário e enviar JWT
x Autorizar usuário por JWT / Criar um middleware de verificação de JWT e autorização
*/
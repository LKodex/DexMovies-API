require('dotenv/config')

const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

require('./routes/moviesRoute')(app)
require('./routes/charactersRoute')(app)

app.listen(process.env.SRV_PORT, process.env.SRV_HOST, () => {
    console.log(`Server listening... http://${process.env.SRV_HOST}:${process.env.SRV_PORT}/`)
})
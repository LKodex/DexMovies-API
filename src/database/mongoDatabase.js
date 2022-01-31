const mongoose = require('mongoose')

let authentication = process.env.DB_HOST.length > 0 && process.env.DB_PASS.length > 0 ? `${process.env.DB_USER}:${process.env.DB_PASS}@` : ``

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${authentication}${process.env.DB_HOST}/${process.env.DB_NAME}`)

module.exports = mongoose
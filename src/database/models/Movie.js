const mongoose = require('../mongoDatabase')

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
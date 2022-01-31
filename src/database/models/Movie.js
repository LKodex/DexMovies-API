const mongoose = require('../mongoDatabase')

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    releaseDate: {
        type: Date,
        require: true
    },
    director: {
        type: Array,
        require: true
    }
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
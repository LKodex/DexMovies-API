const mongoose = require('../mongoDatabase')

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    actor: {
        type: String,
        require: true
    },
    movie: {
        type: mongoose.ObjectId,
        require: true
    }
})

const Character = mongoose.model('Character', CharacterSchema)

module.exports = Character
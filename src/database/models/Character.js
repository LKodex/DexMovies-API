const mongoose = require('../mongoDatabase')

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.ObjectId,
        required: true
    }
})

const Character = mongoose.model('Character', CharacterSchema)

module.exports = Character
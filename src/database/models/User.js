const mongoose = require('../mongoDatabase')
const { SHA3 } = require('sha3')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: password => {
            password = new SHA3(256).update(password).digest('hex')
        }
    },
    admin: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
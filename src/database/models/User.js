const mongoose = require('../mongoDatabase')
const { SHA3 } = require('sha3')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false,
        set: password => {
            return new SHA3(256).update(password).digest('hex')
        }
    },
    admin: {
        type: Boolean,
        require: true,
        default: false
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
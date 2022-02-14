const jwt = require('jsonwebtoken')

const generateToken = (params = {}) => jwt.sign(params, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' })

module.exports = generateToken
const requestResponser = require('../util/requestResponser')

const internalError = (error, request, response, next) => {
    requestResponser(response, { statusCode: 500, message: 'An internal error occurred', authorized: false }, { error: error })
    next()
}

module.exports = internalError
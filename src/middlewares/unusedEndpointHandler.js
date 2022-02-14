const requestResponser = require('../util/requestResponser')

const unusedEndpointHandler = (request, response, next) => {
    requestResponser(response, { statusCode: 404, message: 'Endpoint not found', authorized: false })
    next()
}

module.exports = unusedEndpointHandler
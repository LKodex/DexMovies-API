const requestResponser = require('../util/requestResponser')

const unusedEndpointHandler = (request, response, next) => {
    if(!response.headersSent) {
        return requestResponser(response, { statusCode: 404, message: 'Endpoint not found', authorized: false })
    }
    next()
}

module.exports = unusedEndpointHandler
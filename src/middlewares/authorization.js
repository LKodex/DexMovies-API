const jwt = require('jsonwebtoken')
const requestResponser = require('../util/requestResponser')

const authorization = (request, response, next) => {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        return requestResponser(response, { statusCode: 401, message:"No token provided" })
    }

    const parts = authHeader.split(' ')

    if(parts.length !== 2){
        return requestResponser(response, { statusCode: 401, message:"Token error" })
    }

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme)){
        return requestResponser(response, { statusCode: 401, message:"Token malformatted" })
    }

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decoded) => {
        if (error) {
            return requestResponser(response, { statusCode: 401, message:"Token invalid" })
        }

        request.username = decoded.username;
        return next()
    })
}

module.exports = authorization
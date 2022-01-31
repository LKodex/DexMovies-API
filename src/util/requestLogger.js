const requestLogger = request => {
    console.log(`${request.method}\t${request.baseUrl}\t${request.ip}`)
}

module.exports = requestLogger

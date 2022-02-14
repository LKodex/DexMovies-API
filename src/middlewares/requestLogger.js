const requestLogger = (request, response, next) => {
    let timeDate = new Date().toTimeString()
    process.env.requestCounter = process.env.requestCounter ? Number.parseInt(process.env.requestCounter) + 1 : 0
    console.log(`${process.env.requestCounter}\t${request.method}\t${request.baseUrl}\t${request.ip}\t${timeDate}`)

    next()
}

module.exports = requestLogger
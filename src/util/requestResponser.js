const responser = (response, resInfo, data = {}) => {
    let defaultResponse = {
        "apiName":process.env.API_NAME,
        "apiVersion":{
            "major":process.env.API_MAJOR,
            "minor":process.env.API_MINOR,
            "patch":process.env.API_PATCH
        },
        "status":resInfo.statusCode !== undefined ? resInfo.statusCode : 204,
        "message":resInfo.message !== undefined ? resInfo.message : "There is no message",
        "authorized":resInfo.authorized !== undefined ? resInfo.authorized : false,
        "data":Array.isArray(data) ? data : [data]
    }

    response.status(defaultResponse.status).type('application/json').send(defaultResponse)
}

module.exports = responser
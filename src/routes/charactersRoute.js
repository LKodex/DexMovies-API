const router = require("express").Router()
const requestLogger = require('../util/requestLogger')
const requestResponser = require('../util/requestResponser')
const Character = require('../database/models/Character')

router.post('/', async (request, response) => {
    requestLogger(request)
})

router.get('/', async (request, response) => {
    requestLogger(request)
    try {
        let result = request.query.id !== undefined ? await Character.findOne({ _id:request.query.id }) : await Character.find()
        requestResponser(response, { statusCode:200, message:"OK" }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to retrieve the data." }, {})
    }
})

router.put('/', async (request, response) => {
    requestLogger(request)
})

router.delete('/', async (request, response) => {
    requestLogger(request)
})

module.exports = app => { app.use('/characters', router) }
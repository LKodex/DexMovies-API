const router = require("express").Router()
const requestLogger = require('../util/requestLogger')
const requestResponser = require('../util/requestResponser')
const Movie = require('../database/models/Movie')

router.post('/', async (request, response) => {
    requestLogger(request)
    console.log(request.body)
    try {
        let newMovie = new Movie(request.body)
        let result = await newMovie.save()
        requestResponser(response, { statusCode:201, message:"Data successfully created." }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to create the data."})
    }
})

router.get('/', async (request, response) => {
    requestLogger(request)
    try {
        let result = request.query.id !== undefined ? await Movie.findOne({ _id:request.query.id }) : await Movie.find()
        requestResponser(response, { statusCode:200, message:"OK" }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to retrieve the data." })
    }
})

router.put('/', async (request, response) => {
    requestLogger(request)
    try {
        let id = ''
        if (request.query.id !== undefined){
            id = request.query.id
        } else {
            id = request.body.id !== undefined ? request.body.id : request.body._id
        }
        delete request.body._id
        delete request.body.id

        let result = await Movie.updateOne({ _id:id }, request.body)
        requestResponser(response, { statusCode:200, message:"Successfully updated the data." }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to update the data." })
    }
})

router.delete('/', async (request, response) => {
    requestLogger(request)
    try {
        let result = await Movie.deleteOne({ _id:request.query.id })
        requestResponser(response, { statusCode:200, message:"OK" }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to delete the data." }, {})
    }
})

module.exports = app => { app.use('/movies', router) }
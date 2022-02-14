const router = require("express").Router()
const requestResponser = require('../util/requestResponser')
const Character = require('../database/models/Character')

router.post('/', async (request, response) => {
    try {
        let newCharacter = new Character(request.body)
        let result = await newCharacter.save()
        requestResponser(response, { statusCode:201, message:"Data successfully created." }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to create the data."})
    }
})

router.get('/', async (request, response) => {
    let result
    try {
        if (request.query.id !== undefined) {
            result = await Character.findOne({ _id:request.query.id })
        } else if (request.query.movie !== undefined) {
            result = await Character.find({ movie:request.query.movie })
        } else {
            result = await Character.find()
        }
        requestResponser(response, { statusCode:200, message:"OK" }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to retrieve the data." })
    }
})

router.put('/', async (request, response) => {
    try {
        // Save the ID of the request
        let id = request.body.id !== undefined ? request.body.id : request.body._id
        // Check ifs the ID was included
        if(id === undefined){
            requestResponser(response, { statusCode:406, message:"You need to include the field 'id' in the request body."})
            return
        }

        // The ID is not supposed to be edited so we remove him from body here
        delete request.body._id
        delete request.body.id
        await Character.updateOne({ _id:id }, request.body)
        let characterEdited =  await Character.findOne({ _id:id })
        requestResponser(response, { statusCode:200, message:"Successfully updated the data." }, characterEdited)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to update the data." })
    }
})

router.delete('/', async (request, response) => {
    try {
        let result = await Character.deleteOne({ _id:request.query.id })
        requestResponser(response, { statusCode:200, message:"OK" }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to delete the data." }, {})
    }
})

module.exports = app => { app.use('/characters', router) }
const router = require('express').Router()
const requestResponser = require('../util/requestResponser')
const User = require('../database/models/User')
const authMiddleware = require('../middlewares/authentication')

// Register a new user
router.post('/register', async (request, response) => {
    try {
        let newUser = new User(request.body)
        let result = await newUser.save()
        requestResponser(response, { statusCode:201, message:"User successfully registered." }, result)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to register the user." })
    }
})

// Authenticate a registered user
router.post('/login', async (request, response) => {
    try {

    } catch {
        
    }
})

// Get the list of all registered users (Only for Admin user)
router.get('/', authMiddleware, async (request, response) => {
    try {

    } catch {
        
    }
})

// Update the password (User need to be authorized)
router.put('/', authMiddleware, async (request, response) => {
    try {

    } catch {
        
    }
})

// Delete an existent user (User need to be authorized)
router.delete('/', authMiddleware, async (request, response) => {
    try {

    } catch {
        
    }
})

module.exports = app => { app.use('/users', router) }
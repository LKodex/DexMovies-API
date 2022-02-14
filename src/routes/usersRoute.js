const router = require('express').Router()
const requestResponser = require('../util/requestResponser')
const User = require('../database/models/User')
const authMiddleware = require('../middlewares/authorization')
const generateToken = require('../util/jwtGenerateToken')
const compareHash = require('../util/compareSHA3-256')

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

// Authenticate a registered user (VERY IMPORTANT PART)
router.post('/login', async (request, response) => {
    try {
        let username = request.body.username
        let password = request.body.password
        if (!username) {
            return requestResponser(response, { statusCode:406, message:"You need to include the field 'username' in the request body."})
        }

        let user = await User.findOne({ username: username }).select('+password')
        if (!user) {
            return requestResponser(response, { statusCode:204, message:"User not found."})
        }

        if(!compareHash(password, user.password)) {
            return requestResponser(response, { statusCode:401, message:"Invalid password." })
        }

        requestResponser(response, { statusCode:200, message:"AuthToken successfully generated." }, { user, token: generateToken({ username: user.username, admin: user.admin }) })        
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to authenticate the user." })
    }
})

// Get the list of all registered users (Only for Admin user)
router.get('/', authMiddleware, async (request, response) => {
    try {
        let users = await User.find()
        requestResponser(response, { statusCode: 200, message:"Successfully retrieved all the users." }, users)
    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to retrieve the users." })
    }
})

// Update the password (User need to be authorized)
router.put('/', authMiddleware, async (request, response) => {
    try {

    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to update the user password." })
    }
})

// Delete an existent user (User need to be authorized)
router.delete('/', authMiddleware, async (request, response) => {
    try {

    } catch {
        requestResponser(response, { statusCode:500, message:"An error occured while trying to delete the user." })
    }
})

module.exports = app => { app.use('/users', router) }
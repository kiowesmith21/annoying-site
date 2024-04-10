const express = require('express')
const { createUser, getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router() //create express router

//GET all users
router.get('/', getAllUsers)

//GET single user
router.get('/:name', getUser)

//POST new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

//UPDATE a user
router.patch('/:id', updateUser)

module.exports = router //export the router
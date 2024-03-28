const User = require('../models/userModel') //import the model
const mongoose = require('mongoose')

//get all users
const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1}) //get all documents, sort in decensding order by createdAt date

    res.status(200).json(users) //send back all users
}

//get single user
const getUser = async (req, res) => {
    const {id} = req.params //get id from route parameters

    if(!mongoose.Types.ObjectId.isValid(id)) { //make sure id is valid
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

//create new user
const createUser = async (req, res) => {
    const {name, password} = req.body

    let emptyFields = [] 

    if(!name) {
        emptyFields.push('name')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if(emptyFields.length > 0) { //if there are empty fields
        //return error with message and empty fields
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    
    try {
        //create new document with properties from req body
        const user = await User.create({name, password}) //this is async
        //send response (always send code), send document in json
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({erorr: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id}) //find by id mongoDB is _id

    if(!user) {
        return res.status(400).json({erorr: 'No such user'})
    }

    res.status(200).json(user)
}

//update a user
const updateUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({erorr: 'No such user'})
    }
    //find by id and update
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body //update using req whole body
    })

    if(!user) {
        return res.status(400).json({erorr: 'No such user'})
    }

    res.status(200).json(user)
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}
const mongoose = require('mongoose') //mongoDB has no schemas, make schemas with mongoose

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true}) //another argument, add timestamp when document gets created

module.exports = mongoose.model('User', userSchema) //create and export the model with schema

//schema defines structure, model is used to access collection
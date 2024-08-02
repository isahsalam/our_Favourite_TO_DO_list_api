const mongoose = require(`mongoose`)

const todoSchema = new mongoose.Schema({
title:{type:String,
require: true,
trim: true
},
content:{type:String,
require: true
},
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'App'
}
},{timestamps: true})

const todoModel = mongoose.model(`Todo`, todoSchema)

module.exports = todoModel
const mongoose = require(`mongoose`)

const appSchema = new mongoose.Schema({
    fullName:{type:String,
        require: true
    },
    email:{type:String,
        require: true
    },
    password:{type:String,
        require: true
    },
    isAdmin:{type: Boolean, default: false},
    isVerified:{type: Boolean, default: false},
    todo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
},{timestamps: true})

const appModel = mongoose.model(`App`, appSchema)

module.exports = appModel
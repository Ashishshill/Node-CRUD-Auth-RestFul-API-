const { default: mongoose } = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add Name'] , 
    },
    email: {
        type: String,
        required: [true, 'Please add email'] ,
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Please add Password'] , 
    },
},{
    timestamps : true
})

module.exports = mongoose.model('User', userSchema)
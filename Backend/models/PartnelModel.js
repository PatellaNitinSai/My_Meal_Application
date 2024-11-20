const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    Email:{
        type:Email,
        required:true,
        unique:true
    },
    Password:{
        type:Password,
        required:true,
        unique:true
    }
})
const partner = mongoose.model('partner',partnerSchema)
module.exports = partner
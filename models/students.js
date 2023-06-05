const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    enrolledDepartment:{
        type: String,
        required: true
    },
    enrollmentDate:{
        type: Date,
        default: Date.now()
    },
    studentImage :{
        type: Buffer,
        contentType:String,
        required:true
    }
})

module.exports = mongoose.model('studentModel', studentSchema)
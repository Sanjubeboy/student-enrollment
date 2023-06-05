const studentModel = require('../models/students')

const getAllStudents = async(req, res) => {
    try{
        const students = await studentModel.find();
        res.status(200).json(students)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const addStudents = async(req, res) => {
    const newStudent = new studentModel({
        name: req.body.name,
        enrolledDepartment: req.body.enrolledDepartment,
        enrollmentDate: req.body.enrollmentDate,
        studentImage: req.file.path
    })

    console.log(req.file.path)

    try{
        const students = await newStudent.save()
        res.status(201).json(students)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


const getStudentById = (req, res) => {
    
    try{
        res.status(200).json(res.student)
    }
    catch(error){
        res.send(error)
    }
}


const updatedStudent = async (req, res) => {
    if(req.body.name != null)
    {
        res.student.name = req.body.name
    }
    if(req.body.enrolledDepartment != null)
    {
        res.student.enrolledDepartment = req.body.enrolledDepartment
    }
    if(req.body.enrollmentDate != null)
    {
        res.student.enrollmentDate = req.body.enrollmentDate
    }

    try{
        const updatedStudent = await res.student.save()
        res.status(200).json(updatedStudent)
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
}

const deleteStudent = async(req, res) => {
    try{
        await res.student.deleteOne()
        res.status(200).json({message: `Deleted the user ${res.student.name}`})
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
}


const getStudent = async (req, res, next) => {
    let student
    try{
        student = await studentModel.findById(req.params.id)
        if(student == null){
            return res.status(404).json({message:`Cannot find user id ${req.params.id}`})
        }
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }

    res.student = student;
    next()

}

module.exports = {getAllStudents, addStudents, getStudentById, updatedStudent, deleteStudent, getStudent}
const express = require('express')
const router = express.Router()
const studentModel = require('../models/students')

//getAllStudents
router.get('/', async(req, res) => {
    try{
        const students = await studentModel.find();
        res.status(200).json(students)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//addStudents
router.post('/', async(req, res) => {
    const newStudent = new studentModel({
        name: req.body.name,
        enrolledDepartment: req.body.enrolledDepartment,
        enrollmentDate: req.body.enrollmentDate
    })

    try{
        const students = await newStudent.save()
        res.status(201).json(students)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getStudentById
router.get('/:id', getStudent, (req, res) => {
    // res.send(`Displaying student with id ${req.params.id}`)
    // try{
    //     const student = await studentModel.find({_id:req.params.id})
    //     res.status(200).json(student)
    // }
    // catch(error){
    //     res.status(500).json({message: error.message})
    // }
    try{
        res.status(200).json(res.student)
    }
    catch(error){
        res.send(error)
    }
})

//updateStudent
router.patch('/:id', getStudent,async (req, res) => {
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
})

//deleteStudent
router.delete('/:id', getStudent, async(req, res) => {
    try{
        await res.student.deleteOne()
        res.status(200).json({message: `Deleted the user ${res.student.name}`})
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
})


async function getStudent(req, res, next) {
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


module.exports = router
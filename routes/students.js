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
router.patch('/:id', (req, res) => {
    res.send(`Updating student with id ${req.params.id}`)
})

//deleteStudent
router.delete('/:id', (req, res) => {
    res.send(`Deleting student with id ${req.params.id}`)
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
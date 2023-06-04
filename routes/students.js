const express = require('express')
const router = express.Router()
const studentModel = require('../models/students')
const {getAllStudents, addStudents, getStudentById, updatedStudent, deleteStudent, getStudent} = require('../controllers/students')

//getAllStudents
// router.get('/', getAllStudents)

//addStudents
// router.post('/', addStudents)

router.route('/').get(getAllStudents).post(addStudents)
router.route('/:id').get(getStudent, getStudentById).patch(getStudent, updatedStudent).delete(getStudent, deleteStudent)

//getStudentById
// router.get('/:id', getStudent, getStudentById)

//updateStudent
// router.patch('/:id', getStudent,updatedStudent)

//deleteStudent
// router.delete('/:id', getStudent, deleteStudent)

module.exports = router
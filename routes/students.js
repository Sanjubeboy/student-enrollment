const express = require('express')
const router = express.Router()
const studentModel = require('../models/students')
const {getAllStudents, addStudents, getStudentById, updatedStudent, deleteStudent, getStudent} = require('../controllers/students')



router.route('/').get(getAllStudents).post(addStudents)
router.route('/:id').get(getStudent, getStudentById).patch(getStudent, updatedStudent).delete(getStudent, deleteStudent)


module.exports = router
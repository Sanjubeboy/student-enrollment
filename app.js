require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const students = require('./routes/students')
const mongoose = require('mongoose')
const multer = require('multer')


app.use(express.json())

mongoose.connect(process.env.DB_URL)

// mongoose.connect(`mongodb+srv://sanjaykumar:Sanjay123@cluster0.ozfc3vq.mongodb.net/test`)
const db = mongoose.connection

db.on('error' , errormsg => console.log(errormsg))
db.once('open', () => {
    console.log('Connection Established')
})

console.log("app.js")

app.get('/', (req, res) => {
    res.send('welcome')
})

app.use('/api/v1/students', students)

app.listen(PORT, () => {
    console.log(`API is working on ${PORT}`)
})
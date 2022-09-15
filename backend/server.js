const express = require('express');
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorMiddleware} = require('./middleware/errorMiddleware')
const { connectDB } = require('./config/db')
const port = process.env.PORT || 5000 

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goal', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorMiddleware)

app.listen(port, () => console.log(`Server on port number ${port}`))


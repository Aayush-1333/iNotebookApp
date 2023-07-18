require('dotenv').config()
const express = require('express')
const mongoConnect = require('./db');
const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Connect to DB
mongoConnect()
.then(() => {
  console.log("Connected to the database!")
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
  })
})
.catch((err) => {
  console.group(err);
})

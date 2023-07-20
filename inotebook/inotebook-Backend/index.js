require('dotenv').config()
const express = require('express')
const mongoConnect = require('./db');
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Middleware
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
  app.listen(4000, () => {
    console.log(`inotebook app listening at http://localhost:4000`)
  })
})
.catch((err) => {
  console.group(err);
})

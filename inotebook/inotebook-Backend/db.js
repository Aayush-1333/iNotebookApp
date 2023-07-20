require('dotenv').config()
const mongoose = require('mongoose');
// const mongoUri = process.env.MONGO_URI

const mongoConnect = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/inotebook")
}

module.exports = mongoConnect

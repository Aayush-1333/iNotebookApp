require('dotenv').config()
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI

const mongoConnect = async () => {
    await mongoose.connect(mongoUri)
}

module.exports = mongoConnect

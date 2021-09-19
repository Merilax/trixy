const mongoose = require('mongoose');

module.exports = mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@trixy-mondodb.sv0er.mongodb.net/man?retryWrites=true&w=majority`
    , { useNewUrlParser: true }
);
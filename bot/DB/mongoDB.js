const mongoose = require('mongoose');

module.exports = mongoose.connect(
    `mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@trixy-mondodb.sv0er.mongodb.net/main?retryWrites=true&w=majority`
    , { useNewUrlParser: true }
);
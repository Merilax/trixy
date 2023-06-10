const mongoose = require('mongoose');
var selectedDB;
if (process.env.DEVMODE == "true") {
    selectedDB = `mongodb://127.0.0.1:27017/main`;
    console.log("Selected DEV MongoDB database.");
} else {
    selectedDB = `mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@trixy-mondodb.sv0er.mongodb.net/main`;
    console.log("Selected Prod MongoDB database.");
    // "mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@cluster0.octe2.mongodb.net/"
}
mongoose.set('strictQuery', false);

module.exports = mongoose.connect(
    selectedDB, { useNewUrlParser: true, retryReads: true, retryWrites: true, w: 'majority' }
);
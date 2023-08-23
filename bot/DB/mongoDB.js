const mongoose = require('mongoose');
var selectedDB; var options = {}
if (process.env.DEVMODE == "true") {
    selectedDB = `mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@cluster0.octe2.mongodb.net/`; //mongodb://127.0.0.1:27017/main doesn't work
    options = {useNewUrlParser: true, retryReads: true, retryWrites: true, w: 'majority'}
    console.log("Selected DEV MongoDB database.");
} else {
    selectedDB = `mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@trixy-mondodb.sv0er.mongodb.net/main`;
    options = {useNewUrlParser: true, retryReads: true, retryWrites: true, w: 'majority'}
    console.log("Selected Prod MongoDB database.");
    // "mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@cluster0.octe2.mongodb.net/" // Pioneer
}
mongoose.set('strictQuery', false);

module.exports = mongoose.connect(
    selectedDB, options
);
const mongoose = require('mongoose');
var selectedDB; var options = {}
if (process.env.DEVMODE == "true") {
    selectedDB = `mongodb://127.0.0.1:27017/main`;
    options = { useNewUrlParser: true, retryReads: true, retryWrites: true, w: 'majority' }
    // "mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@cluster0.octe2.mongodb.net/" // Pioneer
} else {
    selectedDB = `mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@trixy-mondodb.sv0er.mongodb.net/main`;
    options = { useNewUrlParser: true, retryReads: true, retryWrites: true, w: 'majority', appName: "Trixy-MondoDB" }
}
mongoose.set('strictQuery', false);

module.exports = mongoose.connect(
    selectedDB, options
);
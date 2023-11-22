const mongoose = require('mongoose');

const uri = "mongodb+srv://DenzelDB:DenzelPassword@cluster0.l9fhivg.mongodb.net/ExamCS230?retryWrites=true&w=majority";

mongoose.connect(uri);

const database = mongoose.connection;
 
database.on('error', console.error.bind(console, 'connection error:'));
 
database.once('open', function() {
    console.log("Database Connection Successful!");
})

module.exports = {
    database
}
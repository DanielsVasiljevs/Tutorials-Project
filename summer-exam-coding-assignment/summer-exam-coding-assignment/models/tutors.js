const mongoose = require('mongoose');
const { Schema } = mongoose;

const tutors = new Schema({
  tutorID: { type: String, required: true, unique: true},
  title: { type: String, required: true },
  name: { type: String, required: true },
  surname : { type: String, required: true } ,
  phoneNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true },
  homeAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: String,
      town: {type: String, required: true},
      county: {type: String, required: true},
      eircode: String
    }
},
{ collection: 'Tutors' });

const Tutor = mongoose.model('Tutors', tutors);
module.exports = {
  Tutor,
  tutors
}
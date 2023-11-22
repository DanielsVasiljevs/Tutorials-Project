const mongoose = require('mongoose');
const { Schema } = mongoose;

const students = new Schema(
  {
  studentID: { type: String, required: true, unique: true},
  title: { type: String, required: true },
  name: { type: String, required: true },
  surname : { type: String, required: true } ,
  phoneNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true },
  homeAddress:{
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      town: {type: String, required: true},
      county: {type: String, required: true},
      eircode: { type: String }
    },
  additionalDetails:{
      DOB:{type: Date, required: true },
      parentName:{type: String},
      permissionToAttendVirtually:{type: Boolean, required: true},
      gender:{type: String, required: true},
      subject:{type: String}
    }   
},

{ collection: 'Students', timestamps: true});

const Student = mongoose.model('Students', students);
module.exports = {
  Student,
  students
}
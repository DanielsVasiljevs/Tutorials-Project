const mongoose = require('mongoose');
const { Schema } = mongoose;

const tutorials = new Schema(
  {
    studentsEnrolled: [
      {
        studentID: { type: String, required: true },
      },
    ],
    tutorID: { type: String, required: true, unique: true },
    fee: { type: Number, required: true },
    tutorialNumber: { type: String, required: true, unique: true },
    tutorialAttendance: { type: String, required: true },
    tutorialSubject: { type: String, required: true },
    tutorialNotes: { type: String, required: true },
  },
  { collection: "Tutorials" , timestamps: true }
);

const Tutorial = mongoose.model("Tutorials", tutorials);
module.exports = {
  Tutorial,
  tutorials,
};

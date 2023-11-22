const express = require("express");
const app = express();
const cors = require('cors');
const port = 5000
const database = require('./connection')
const bodyParser = require('body-parser')

const { Student } = require('./models/students.js')
const { Tutor } = require('./models/tutors.js')
const { Tutorial } = require('./models/tutorials.js')

const {validatePhoneNumber} = require('./validation')
const {validateEmailAddress} = require('./validation')
const {age} = require('./validation')

app.listen(port, () => {
  console.log(`App working on port ${port}`)
})
app.use(bodyParser.json())
app.use(cors());

// CRUD Operations for Students
// Insert a student
app.post("/createStudent", (req,res) => {


  const isValidEmail = validateEmailAddress(emailAddress);
  console.log(isValidEmail); // true or false

  const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
  console.log(isValidPhoneNumber); // true or false

  const isParentName = parentName(age);
  console.log(isParentName); // true or false


  // check if phone number is in valid format(either 12345678 or (123)-456-789)
  console.log(validatePhoneNumber(req.body.phoneNumber));
  if (!validatePhoneNumber(req.body.phoneNumber)) {
    return res.send({message: 'Invalid Phone Number'})
}

  // check if email address is in valid format(myemail@email.something)
  console.log(validateEmailAddress(req.body.emailAddress));
  if (!validateEmailAddress(req.body.emailAddress)) {
    return res.send({message: 'Invalid Email Address'})
} 
  // check if student is underage and if they are ask for their parent's name 
  if (age(req.body.additionalDetails.DOB) < 18) {
    if(!req.body.additionalDetails.parentName){
      return res.send({message: "Parent's name required"})
    }
  }

  const student = new Student(req.body)
  student.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => { 
      res.json({message: err})
    })
});

// Find a student
app.post("/getStudent", (req, res) => {
  Student.findOne({
    studentID: req.body.studentID,
  }).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
});

// Find a student
app.get("/getAllStudents", (req, res) => {
  Student.find().then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
});

// Update a student
app.put("/updateStudent", (req, res) =>{
  Student.findOneAndUpdate({ studentID: req.body.studentID}, req.body).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
})

// Delete a student
app.delete("/deleteStudent",(req, res) => {
  Student.findOneAndDelete({
    studentID: req.body.studentID,
  }).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
})


// CRUD Operations for Tutors
// Insert a tutor
app.post("/createTutor", (req,res) => {

  // check if phone number is in valid format(either 12345678 or (123)-456-789)
  console.log(validatePhoneNumber(req.body.phoneNumber));
  if (!validatePhoneNumber(req.body.phoneNumber)) {
    return res.send({message: 'Invalid Phone Number'})
}

  // check if email address is in valid format(myemail@email.something)
  console.log(validateEmailAddress(req.body.emailAddress));
  if (!validateEmailAddress(req.body.emailAddress)) {
    return res.send({message: 'Invalid Email Address'})
} 
  const tutor = new Tutor(req.body)
  tutor.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => { 
      res.json({message: err})
    })
});

// Find a tutor
app.post("/getTutor", (req, res) => {
  Tutor.findOne({
    tutorID: req.body.tutorID,
  }).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
});

// Find all tutors
app.get("/getAllTutors", (req, res) => {
  Tutor.find().then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
});

// Update a tutor
app.put("/updateTutor", (req, res) =>{
  Tutor.findOneAndUpdate( {tutorID: req.body.tutorID}, req.body).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
})

// Delete a tutor
app.delete("/deleteTutor",(req, res) => {
  Tutor.findOneAndDelete({
    tutorID: req.body.tutorID,
  }).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
})


// CRUD Operations for Tutorials

// Insert a tutorial
app.post("/createTutorial", (req,res) => {
  const tutorial = new Tutorial(req.body)
  tutorial.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => { 
      res.json({message: err})
    })
    
});

// Find a tutorials
app.get("/getAllTutorials", (req, res) => {
  Tutorial.find().then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
});

app.delete("/deleteTutorial",(req, res) => {
  console.log(req.body);
  Tutorial.findOneAndDelete({
    tutorialNumber: req.body.tutorialNumber,
  }).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
})

// Update a tutor
app.put("/updateTutorial", (req, res) =>{
  Tutorial.findOneAndUpdate( {tutorialNumber: req.body.tutorialNumber}, req.body).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
})


// Find a tutorial by id
app.post("/getTutorial", (req, res) => {
  Tutorial.findOne({
    tutorialNumber: req.body.tutorialNumber,
  }).then(data => {
    res.json(data)
  })
  .catch(err => { 
    res.json({message: err})
  })
});




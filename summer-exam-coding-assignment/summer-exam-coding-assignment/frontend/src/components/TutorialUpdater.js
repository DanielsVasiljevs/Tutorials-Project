import React, {  useState } from "react"
import axios from 'axios' 
import '../style/Main.css'

function TutorialUpdater() {

  const [tutorForm, setTutorForm] = useState({ title: ''})
  const [failedAddTutors, setFailedAddTutors] = useState(false)

function handleChange(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, [inputName]: event.target.value})
}



function handleChangeAdditional(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, studentsEnrolled: { ...tutorForm.studentsEnrolled,[inputName]: event.target.value}})
}

async function updateTutor(e) {
e.preventDefault();

  const response = await axios.put('http://localhost:5000/updateTutorial', {...tutorForm})
  console.log(response);
  if (response.data?.message?.errors !== undefined) {
    setFailedAddTutors(true)
  } else {
    setFailedAddTutors(false)
  }
}

console.log(tutorForm);
  return (
  <div className="Main">
  <div className="Tutors">

      <div className="addTutorForm">
    <form onSubmit={updateTutor}>
    <div className="inputs">
    <input required id="tutorialNumber" placeholder="tutorialNumber" onChange={handleChange}/>
      <input required id="tutorID" placeholder="tutorID" onChange={handleChange}/>
      <input required id="fee" type={'number'} placeholder="fee" onChange={handleChange}/>
      
      <input required id='tutorialNotes' placeholder={'tutorialNotes'} onChange={handleChange}/>
      <div>NOTE: you can only add one student to tutorial per update</div>
      <input id="studentID" placeholder="studentID" onChange={handleChangeAdditional}/>


    </div>
    <select defaultValue={'1'} required id="tutorialAttendance" onChange={handleChange}>
      <option required value={'1'} disabled>Please select tutorial attendance</option>
        <option>Attended</option>
        <option>Canceled</option>
        <option>No show</option>
      </select>

      <select defaultValue={'1'} required id="tutorialSubject" onChange={handleChange}>
      <option required value={'1'} disabled>Please select tutorial subject</option>
        <option>English</option>
        <option>Irish</option>
        <option>Maths</option>
        <option>Biology</option>
        <option>Chemistry</option>
        <option>Physics</option>
        <option>Computer Science</option>
      </select>
      <div>
      <button type="submit">UPDATE Tutorial</button>
      {failedAddTutors && 'Failed to update a Tutor...'}
      </div>
    </form>
      </div>
    </div>
  </div> 
  )
}

export default TutorialUpdater
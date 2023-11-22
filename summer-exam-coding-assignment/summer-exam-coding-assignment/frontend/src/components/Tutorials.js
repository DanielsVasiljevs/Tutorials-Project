import React, { useEffect, useState } from "react"
import axios from 'axios' 
import '../style/Main.css'
import TutorialUpdater from "./TutorialUpdater"
const serverUrl = 'http://localhost:5000'
function Tutorials() {

  const [tutorials, setTutorials] = useState()
  const [tutorialForm, setTutorForm] = useState({ title: ''})
  const [opentutorialForm, setOpentutorialForm] = useState(false)
  const [openTutorUpdate, setOpenTutorUpdate] = useState(false)
  const [failedAddTutorials, setFailedAddTutors] = useState(false)
  const [singleTutor, setSingleTutor] = useState()

  async function getUserData(){
    const response = await axios.get('http://localhost:5000/getAllTutorials')
    setTutorials(response.data)
  }
useEffect(()=> {
  getUserData()
},[]
)

function handleChange(event) {
  const inputName = event.target.id
  setTutorForm({...tutorialForm, [inputName]: event.target.value})
}
function handleChangeAdditional(event) {
  const inputName = event.target.id
  setTutorForm({...tutorialForm, studentsEnrolled: { ...tutorialForm.studentsEnrolled,[inputName]: event.target.value}})
}


async function deleteTutorial(tutorialNumber) {
  const response = await axios.delete(`${serverUrl}/deleteTutorial`, { data:{tutorialNumber}})
  getUserData()
  console.log(response);
}

async function submitTutor(e) {

  const response = await axios.post('http://localhost:5000/createTutorial', {...tutorialForm})
  if (response.data.message?.errors !== undefined) {
    setFailedAddTutors(true)
  } else {
    setFailedAddTutors(false)
  }
  getUserData()
}

async function findTutorById(e) {
  console.log(e.target.value);
  const response = await axios.post(`${serverUrl}/getTutorial`,{tutorialNumber: e.target.value})
    setSingleTutor(response.data)
  console.log(response);
}

  return (
  <div className="Tutors">

    <h1>Tutorials</h1>
      <table>
      <thead>
      <tr>
        <th>Tutorial Number</th>
        <th>Tutorial Attendance</th>
        <th>Tutorial Subject</th>
        <th>Tutorial Notes</th>
        <th>Tutorial Fee</th>
        <th>Tutor ID</th>
        <th>Students Enrolled</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {
        tutorials?.map((tutorial, index)=> {
          return (
      <tr key={index}>
        <td>
            {tutorial.tutorialNumber}
        </td>
        <td>
            {tutorial.tutorialAttendance}
        </td>
        <td>
            {tutorial.tutorialSubject}
        </td>
        <td>
            {tutorial.tutorialNotes}
        </td>
        <td>
            {tutorial.fee}€
        </td>
        <td>
            {tutorial.tutorID}
        </td>
        <td>
            {tutorial.studentsEnrolled.map((student) => {
              return <div style={{marginBottom: '5px'}}>
              {student.studentID}
              </div>
            })}
            {tutorial.emailAddress}
        </td>
        <td>
            <button onClick={()=>deleteTutorial(tutorial.tutorialNumber)}>Delete Tutor</button>
        </td>
      </tr>

          )
        })
      }
      </tbody>

      </table>
    <button onClick={() =>setOpentutorialForm(!opentutorialForm)}>OPEN Tutor FORM</button>
    {opentutorialForm && (
      <div className="addtutorialForm">
    <form onSubmit={submitTutor}>
    <div className="inputs">
      <input required id="tutorialNumber" placeholder="tutorialNumber" onChange={handleChange}/>
      <input required id="tutorID" placeholder="tutorID" onChange={handleChange}/>
      <input required id="fee" placeholder="fee" onChange={handleChange}/>
      <input required id="tutorialNumber" placeholder="tutorialNumber" onChange={handleChange}/>
      
      <input required id='tutorialNotes' placeholder={'tutorialNotes'} onChange={handleChange}/>
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
      <button type="submit">ADD Tutor</button>
      {failedAddTutorials && 'Failed to add a Tutor...'}
      </div>
    </form>
      </div>
    )}
      <button onClick={() =>setOpenTutorUpdate(!openTutorUpdate)}>OPEN Tutor UPDATER</button>
      { openTutorUpdate && <TutorialUpdater/>}
      <div className="find">
    <input placeholder="Find a Tutorial by it's ID" onChange={(e)=> findTutorById(e)}></input>
    <div>
      <span>tutorialNumber: </span>
      <span>{singleTutor?.tutorialNumber}</span>
      <br></br>
      <span>fee: </span>
      <span>{singleTutor?.fee}</span>
      <br></br>
      <span>tutorialAttendance: </span>
      <span>{singleTutor?.tutorialAttendance}</span>
      <br></br>
      <span>tutorialSubject: </span>
      <span>{singleTutor?.tutorialSubject}</span>
      <br></br>
      <span>tutorialNotes: </span>
      <span>{singleTutor?.tutorialNotes}</span>
      <br></br>
      <div>studentsEnrolled: </div>
      {
        singleTutor?.studentsEnrolled.map((student) => {return(
          <>
           <span>{student?.studentID}</span>
            <br></br>
          </>
        )

        })
      }
      
     

      </div>
      </div>
    </div>
  )
}

export default Tutorials
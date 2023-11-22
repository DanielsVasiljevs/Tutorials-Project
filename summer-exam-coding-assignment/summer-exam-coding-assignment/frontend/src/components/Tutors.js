import React, { useEffect, useState } from "react"
import axios from 'axios' 
import '../style/Main.css'
import TutorUpdater from "./TutorUpdater"
const serverUrl = 'http://localhost:5000'
function Tutors() {

  const [tutors, setTutors] = useState()
  const [tutorForm, setTutorForm] = useState({ title: ''})
  const [opentutorForm, setOpentutorForm] = useState(false)
  const [openTutorUpdate, setOpenTutorUpdate] = useState(false)
  const [failedAddTutors, setFailedAddTutors] = useState(false)
  const [singleTutor, setSingleTutor] = useState()

  async function getUserData(){
    const response = await axios.get('http://localhost:5000/getAllTutors')
    setTutors(response.data)
  }
useEffect(()=> {
  getUserData()
},[]
)

function handleChange(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, [inputName]: event.target.value})
}
function handleChangeAdditional(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, additionalDetails: { ...tutorForm.additionalDetails,[inputName]: event.target.value}})
}

function handleChangeHomeAdress(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, homeAddress: { ...tutorForm.homeAddress,[inputName]: event.target.value}})
}

// Source: https://www.coditty.com/code/javascript-18-years-validation
function underAgeValidate(birthday){
	// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	var optimizedBirthday = birthday.replace(/-/g, "/");

	//set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	var myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';

	// calculate age comparing current date and borthday
	var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

	if(myAge < 18) {
     	    return false;
        }else{
	    return true;
	}

} 
async function deleteTutor(tutorID) {
  console.log(tutorID);
  const response = await axios.delete(`${serverUrl}/deleteTutor`, { data:{tutorID}})
  getUserData()
  console.log(response);
}

async function submitTutor(e) {
e.preventDefault();

  const response = await axios.post('http://localhost:5000/createTutor', {...tutorForm})
  if (response.data.message?.errors !== undefined) {
    setFailedAddTutors(true)
  } else {
    setFailedAddTutors(false)
  }
  getUserData()
}

async function findTutorById(e) {
  console.log(e.target.value);
  const response = await axios.post(`${serverUrl}/getTutor`,{tutorID: e.target.value})
    setSingleTutor(response.data)
  console.log(response);
}

  return (
  <div className="Tutors">

    <h1>Tutors</h1>
      <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Title</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {
        tutors?.map((tutor, index)=> {
          return (
      <tr key={index}>
        <td>
            {tutor.tutorID}
        </td>
        <td>
            {tutor.name}
        </td>
        <td>
            {tutor.surname}
        </td>
        <td>
            {tutor.title}
        </td>
        <td>
            {tutor.phoneNumber}
        </td>
        <td>
            {tutor.emailAddress}
        </td>
        <td>
            <button onClick={()=>deleteTutor(tutor.tutorID)}>Delete Tutor</button>
        </td>
      </tr>

          )
        })
      }
      </tbody>

      </table>
    <button onClick={() =>setOpentutorForm(!opentutorForm)}>OPEN Tutor FORM</button>
    {opentutorForm && (
      <div className="addtutorForm">
    <form onSubmit={submitTutor}>
    <div className="inputs">
      <input required id="tutorID" placeholder="tutorID" onChange={handleChange}/>
      <input required id="name" placeholder="name" onChange={handleChange}/>
      <input required id="surname" placeholder="surname" onChange={handleChange}/>
      <input required id="phoneNumber" type={'number'} placeholder="phoneNumber" onChange={handleChange}/>
      <input required id="addressLine1" placeholder="addressLine1" onChange={handleChangeHomeAdress}/>
      <input id="addressLine2" placeholder="addressLine2" onChange={handleChangeHomeAdress}/>
      <input required id="county" placeholder="county" onChange={handleChangeHomeAdress}/>
      <input required id="town" placeholder="town" onChange={handleChangeHomeAdress}/>
      <input required id="eircode" placeholder="eircode" onChange={handleChangeHomeAdress}/>
      
      <input required id='emailAddress' type={'email'} placeholder={'email'} onChange={handleChange}/>

    </div>
      <select defaultValue={'1'} required id="title" onChange={handleChange}>
      <option required value={'1'} disabled>Please select your title</option>
        <option>Mr</option>
        <option>Ms</option>
        <option>Mrs</option>
        <option>Other</option>
      </select>
      {(tutorForm.title !== 'Mr' && tutorForm.title !== 'Mrs' && tutorForm.title !== 'Ms' && tutorForm.title !== '')
       && 
      <input required id="title" defaultValue={''} type={'text'} placeholder="Specify your title" onChange={handleChange} />
      }
      <div>
      <button type="submit">ADD Tutor</button>
      {failedAddTutors && 'Failed to add a Tutor...'}
      </div>
    </form>
      </div>
    )}
      <button onClick={() =>setOpenTutorUpdate(!openTutorUpdate)}>OPEN Tutor UPDATER</button>
      { openTutorUpdate && <TutorUpdater/>}
      <div className="find">
      {/* Not implemented yet */}
    <input placeholder="Find a Tutor by his ID" onChange={(e)=> findTutorById(e)}></input>
    <div>
      <span>ID: </span>
      <span>{singleTutor?.tutorID}</span>
      <br></br>
      <span>title: </span>
      <span>{singleTutor?.title}</span>
      <br></br>
      <span>Name: </span>
      <span>{singleTutor?.name}</span>
      <br></br>
      <span>phoneNumber: </span>
      <span>{singleTutor?.phoneNumber}</span>
      <br></br>
      <span>emailAddress: </span>
      <span>{singleTutor?.emailAddress}</span>
      <br></br>

      
      <span>addressLine1: </span>
      <span>{singleTutor?.homeAddress.addressLine1}</span>
      <br></br>
      <span>addressLine2: </span>
      <span>{singleTutor?.homeAddress.addressLine2}</span>
      <br></br>
      <span>town: </span>
      <span>{singleTutor?.homeAddress.town}</span>
      <br></br>
      <span>county: </span>
      <span>{singleTutor?.homeAddress.county}</span>
      <br></br>
      <span>eircode: </span>
      <span>{singleTutor?.homeAddress.eircode}</span>
      <br></br>

      </div>
      </div>
    </div>
  )
}

export default Tutors
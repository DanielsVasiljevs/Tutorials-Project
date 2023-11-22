import React, {  useState } from "react"
import axios from 'axios' 
import '../style/Main.css'
const serverUrl = 'http://localhost:5000'
function StudentUpdater() {

  const [studentForm, setStudentForm] = useState({ title: ''})
  const [canAttendVirtually, setCanAttendVirtually] = useState(false)
  const [failedAddStudents, setFailedAddStudents] = useState(false)


function handleChange(event) {
  const inputName = event.target.id
  setStudentForm({...studentForm, [inputName]: event.target.value})
}
function handleChangeAdditional(event) {
  const inputName = event.target.id
  setStudentForm({...studentForm, additionalDetails: { ...studentForm.additionalDetails,[inputName]: event.target.value}})
}

function handleChangeHomeAdress(event) {
  const inputName = event.target.id
  setStudentForm({...studentForm, homeAddress: { ...studentForm.homeAddress,[inputName]: event.target.value}})
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

async function updateStudent(e) {

  const response = await axios.put('http://localhost:5000/updateStudent', {...studentForm, additionalDetails: { ...studentForm.additionalDetails, permissionToAttendVirtually: canAttendVirtually}})
  if (response.data.message?.errors !== undefined) {
    setFailedAddStudents(true)
  } else {
    setFailedAddStudents(false)
  }
}

console.log(studentForm);
  return (
  <div className="Main">
  <div className="Students">

      <div className="addStudentForm">
    <form onSubmit={updateStudent}>
    <div className="inputs">
      <input required id="studentID" placeholder="studentID" onChange={handleChange}/>
      <input  id="name" placeholder="name" onChange={handleChange}/>
      <input  id="surname" placeholder="surname" onChange={handleChange}/>
     
      <input  id="phoneNumber" type={'number'} placeholder="phoneNumber" onChange={handleChange}/>
      <input  id="addressLine1" placeholder="addressLine1" onChange={handleChangeHomeAdress}/>
      <input id="addressLine2" placeholder="addressLine2" onChange={handleChangeHomeAdress}/>
      <input  id="county" placeholder="county" onChange={handleChangeHomeAdress}/>
      <input  id="town" placeholder="town" onChange={handleChangeHomeAdress}/>
      <input  id="eircode" placeholder="eircode" onChange={handleChangeHomeAdress}/>
      
      <input id="subject" type={'text'} placeholder="subject" onChange={handleChangeAdditional}/>
      <input  id='emailAddress' type={'email'} placeholder={'email'} onChange={handleChange}/>

    </div>
      <select defaultValue={'1'}  id="title" onChange={handleChange}>
      <option  value={'1'} disabled>Please select your title</option>
        <option>Mr</option>
        <option>Ms</option>
        <option>Mrs</option>
        <option>Other</option>
      </select>
      {(studentForm.title !== 'Mr' && studentForm.title !== 'Mrs' && studentForm.title !== 'Ms' && studentForm.title !== '')
       && 
      <input  id="title" defaultValue={''} type={'text'} placeholder="Specify your title" onChange={handleChange} />
      }

      <select defaultValue={'1'}  id="gender" onChange={handleChangeAdditional}>
      <option  value={'1'} disabled>Please select your gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <label>Permission to attend virtually</label>
      <input id="permissionToAttendVirtually" type={'checkbox'} placeholder="permissionToAttendVirtually" onClick={() =>setCanAttendVirtually(!canAttendVirtually)}/>
      Date of Birth:
      <input  id="DOB"  placeholder="Date of birth" type={'date'} onChange={handleChangeAdditional} />
      {studentForm?.additionalDetails?.DOB && !underAgeValidate(studentForm?.additionalDetails?.DOB) &&

        <div>
        <label>Student not old enough and requires a Parent Name</label>
        <input  id="parentName" placeholder="Parent Name" onChange={handleChangeAdditional}/>
        </div>
      }

      <div>
      <button type="submit">UPDATE STUDENT</button>
      {failedAddStudents && 'Failed to update a student...'}
      </div>
    </form>
      </div>
    </div>
  </div> 
  )
}

export default StudentUpdater
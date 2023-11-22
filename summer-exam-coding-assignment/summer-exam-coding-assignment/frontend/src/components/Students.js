import React, {useEffect, useState} from "react"
import axios from "axios"
import StudentUpdater from "./StudentUpdater"
const serverUrl = 'http://localhost:5000'

function Tutors() {
  
  const [students, setStudents] = useState()
  const [studentForm, setStudentForm] = useState({ title: ''})
  const [openStudentForm, setOpenStudentForm] = useState(false)
  const [openStudentUpdate, setOpenStudentUpdate] = useState(false)
  const [canAttendVirtually, setCanAttendVirtually] = useState(false)
  const [failedAddStudents, setFailedAddStudents] = useState(false)
  const [singleStudent, setSingleStudent] = useState()

  async function getUserData(){
    const response = await axios.get('http://localhost:5000/getAllStudents')
    setStudents(response.data)
  }
useEffect(()=> {
  getUserData()
},[]
)

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
async function deleteStudent(studentID) {
  console.log(studentID);
  const response = await axios.delete(`${serverUrl}/deleteStudent`, { data:{studentID}})
  getUserData()
  console.log(response);
}

async function submitStudent(e) {
e.preventDefault();

  const response = await axios.post('http://localhost:5000/createStudent', {...studentForm, additionalDetails: { ...studentForm.additionalDetails, permissionToAttendVirtually: canAttendVirtually}})
  if (response.data.message?.errors !== undefined) {
    setFailedAddStudents(true)
  } else {
    setFailedAddStudents(false)
  }
  getUserData()
}

async function findStudentById(e) {
  console.log(e.target.value);
  const response = await axios.post(`${serverUrl}/getStudent`,{studentID: e.target.value})
    setSingleStudent(response.data)
    console.log(singleStudent);
  console.log(response);
}
console.log(singleStudent);
  return (
  <div className="Students">

    <h1>Students</h1>
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
        students?.map((student, index)=> {
          return (
      <tr key={index}>
        <td>
            {student.studentID}
        </td>
        <td>
            {student.name}
        </td>
        <td>
            {student.surname}
        </td>
        <td>
            {student.title}
        </td>
        <td>
            {student.phoneNumber}
        </td>
        <td>
            {student.emailAddress}
        </td>
        <td>
            <button onClick={()=>deleteStudent(student.studentID)}>Delete student</button>
        </td>
      </tr>

          )
        })
      }
      </tbody>

      </table>
    <button onClick={() =>setOpenStudentForm(!openStudentForm)}>OPEN STUDENT FORM</button>
    {openStudentForm && (
      <div className="addStudentForm">
    <form onSubmit={submitStudent}>
    <div className="inputs">
      <input required id="studentID" placeholder="studentID" onChange={handleChange}/>
      <input required id="name" placeholder="name" onChange={handleChange}/>
      <input required id="surname" placeholder="surname" onChange={handleChange}/>
     
      <input required id="phoneNumber" type={'number'} placeholder="phoneNumber" onChange={handleChange}/>
      <input required id="addressLine1" placeholder="addressLine1" onChange={handleChangeHomeAdress}/>
      <input id="addressLine2" placeholder="addressLine2" onChange={handleChangeHomeAdress}/>
      <input required id="county" placeholder="county" onChange={handleChangeHomeAdress}/>
      <input required id="town" placeholder="town" onChange={handleChangeHomeAdress}/>
      <input required id="eircode" placeholder="eircode" onChange={handleChangeHomeAdress}/>
      
      <input id="subject" type={'text'} placeholder="subject" onChange={handleChangeAdditional}/>
      <input required id='emailAddress' type={'email'} placeholder={'email'} onChange={handleChange}/>

    </div>
      <select defaultValue={'1'} required id="title" onChange={handleChange}>
      <option required value={'1'} disabled>Please select your title</option>
        <option>Mr</option>
        <option>Ms</option>
        <option>Mrs</option>
        <option>Other</option>
      </select>
      {(studentForm.title !== 'Mr' && studentForm.title !== 'Mrs' && studentForm.title !== 'Ms' && studentForm.title !== '')
       && 
      <input required id="title" defaultValue={''} type={'text'} placeholder="Specify your title" onChange={handleChange} />
      }

      <select defaultValue={'1'} required id="gender" onChange={handleChangeAdditional}>
      <option required value={'1'} disabled>Please select your gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <label>Permission to attend virtually</label>
      <input id="permissionToAttendVirtually" type={'checkbox'} placeholder="permissionToAttendVirtually" onClick={() =>setCanAttendVirtually(!canAttendVirtually)}/>
      Date of Birth:
      <input required id="DOB"  placeholder="Date of birth" type={'date'} onChange={handleChangeAdditional} />
      {studentForm?.additionalDetails?.DOB && !underAgeValidate(studentForm?.additionalDetails?.DOB) &&

        <div>
        <label>Student not old enough and requires a Parent Name</label>
        <input required id="parentName" placeholder="Parent Name" onChange={handleChangeAdditional}/>
        </div>
      }

      <div>
      <button type="submit">ADD STUDENT</button>
      {failedAddStudents && 'Failed to add a student...'}
      </div>
    </form>
      </div>
    )}
      <button onClick={() =>setOpenStudentUpdate(!openStudentUpdate)}>OPEN STUDENT UPDATER</button>
      { openStudentUpdate && <StudentUpdater/>}
      <div className="find">
      {/* Not implemented yet */}
    <input placeholder="Find a student by his ID" onChange={(e)=> findStudentById(e)}></input>

      <div>
      <span>ID: </span>
      <span>{singleStudent?.studentID}</span>
      <br></br>
      <span>title: </span>
      <span>{singleStudent?.title}</span>
      <br></br>
      <span>Name: </span>
      <span>{singleStudent?.name}</span>
      <br></br>
      <span>phoneNumber: </span>
      <span>{singleStudent?.phoneNumber}</span>
      <br></br>
      <span>emailAddress: </span>
      <span>{singleStudent?.emailAddress}</span>
      <br></br>

      
      <span>addressLine1: </span>
      <span>{singleStudent?.homeAddress.addressLine1}</span>
      <br></br>
      <span>addressLine2: </span>
      <span>{singleStudent?.homeAddress.addressLine2}</span>
      <br></br>
      <span>town: </span>
      <span>{singleStudent?.homeAddress.town}</span>
      <br></br>
      <span>county: </span>
      <span>{singleStudent?.homeAddress.county}</span>
      <br></br>
      <span>eircode: </span>
      <span>{singleStudent?.homeAddress.eircode}</span>
      <br></br>


      <span>DOB: </span>
      <span>{singleStudent?.additionalDetails.DOB}</span>
      <br></br>
      <span>parentName: </span>
      <span>{singleStudent?.additionalDetails.parentName}</span>
      <br></br>
      <span>permissionToAttendVirtually: </span>
      <span>{singleStudent?.additionalDetails.permissionToAttendVirtually}</span>
      <br></br>
      <span>gender: </span>
      <span>{singleStudent?.additionalDetails.gender}</span>
      <br></br>
      <span>subject: </span>
      <span>{singleStudent?.additionalDetails.subject}</span>
      <br></br>
      </div>

    </div>
  </div>

  )
}
export default Tutors
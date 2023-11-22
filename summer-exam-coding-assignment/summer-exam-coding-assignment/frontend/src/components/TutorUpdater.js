import React, {  useState } from "react"
import axios from 'axios' 
import '../style/Main.css'

function TutorUpdater() {

  const [tutorForm, setTutorForm] = useState({ title: ''})
  const [failedAddTutors, setFailedAddTutors] = useState(false)

function handleChange(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, [inputName]: event.target.value})
}

function handleChangeHomeAdress(event) {
  const inputName = event.target.id
  setTutorForm({...tutorForm, homeAddress: { ...tutorForm.homeAddress,[inputName]: event.target.value}})
}

async function updateTutor(e) {

  const response = await axios.put('http://localhost:5000/updateTutor', {...tutorForm})
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
      <input required id="tutorID" placeholder="tutorID" onChange={handleChange}/>
      <input  id="name" placeholder="name" onChange={handleChange}/>
      <input  id="surname" placeholder="surname" onChange={handleChange}/>
     
      <input  id="phoneNumber" type={'number'} placeholder="phoneNumber" onChange={handleChange}/>
      <input  id="addressLine1" placeholder="addressLine1" onChange={handleChangeHomeAdress}/>
      <input id="addressLine2" placeholder="addressLine2" onChange={handleChangeHomeAdress}/>
      <input  id="county" placeholder="county" onChange={handleChangeHomeAdress}/>
      <input  id="town" placeholder="town" onChange={handleChangeHomeAdress}/>
      <input  id="eircode" placeholder="eircode" onChange={handleChangeHomeAdress}/>
      
      <input  id='emailAddress' type={'email'} placeholder={'email'} onChange={handleChange}/>

    </div>
      <select defaultValue={'1'}  id="title" onChange={handleChange}>
      <option  value={'1'} disabled>Please select your title</option>
        <option>Mr</option>
        <option>Ms</option>
        <option>Mrs</option>
        <option>Other</option>
      </select>
      {(tutorForm.title !== 'Mr' && tutorForm.title !== 'Mrs' && tutorForm.title !== 'Ms' && tutorForm.title !== '')
       && 
      <input  id="title" defaultValue={''} type={'text'} placeholder="Specify your title" onChange={handleChange} />
      }

      <div>
      <button type="submit">UPDATE Tutor</button>
      {failedAddTutors && 'Failed to update a Tutor...'}
      </div>
    </form>
      </div>
    </div>
  </div> 
  )
}

export default TutorUpdater
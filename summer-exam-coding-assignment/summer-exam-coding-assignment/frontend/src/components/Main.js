import React, { useEffect, useState } from "react"
import axios from 'axios' 
import '../style/Main.css'
import Students from "./Tutors"
import Tutors from "./Students"
import Tutorials from "./Tutorials"
const serverUrl = 'http://localhost:5000'
function Main() {

 return (

  <div className="Main">
    <Students/>
    <Tutors/>
    <Tutorials/>
  </div>
 )
}

export default Main
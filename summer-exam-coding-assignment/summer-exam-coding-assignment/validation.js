// Phone Number validation
function validatePhoneNumber(phoneNumber) {
  const phoneNumberValid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const numberToString = phoneNumber.toString();
  if(numberToString.match(phoneNumberValid)){
    return true;
  }
  return false;
}

// Email validation
function validateEmailAddress(emailAddress){
  const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailAddress.match(emailValid)){
    return true;
  }
  return false;
}

// check if student is younger than 18 and needs parent's name
function age(birthday){
	// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	var optimizedBirthday = birthday.replace(/-/g, "/");

	//set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	var myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';

	// calculate age comparing current date and borthday
	var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
  console.log(myAge);
	return myAge;

} 

module.exports = {
  validateEmailAddress,validatePhoneNumber,age
}


//Source: 
// https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
// https://www.abstractapi.com/guides/validate-phone-number-javascript
// https://www.coditty.com/code/javascript-18-years-validation
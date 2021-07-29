
// client-side js
// run by the browser each time your view template is loaded
// define variables that reference elements on our page
const santaForm = document.forms[0];
const wishMessage = document.querySelector("#wish"); 
const userName = document.querySelector("#username");
const curChar = document.querySelector("#cur-char");

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function(event) {
  // TODO: check the text isn't more than 100chars before submitting
  // event.preventDefault();
  checkInputs(); // to check user inputs

  if (!checkInputs()) {
    event.preventDefault();
  }
};

// listen to the textarea of wish form for character counting
wishMessage.addEventListener("keyup", () => {
  const charNum = wishMessage.value.split("");
  const charCount = charNum.length; // count the character by length
  curChar.innerText = charCount; // update the character count

  const maxCharLength = 100; // max character length for wish form
  const colorChange = 0.8 * maxCharLength; // color indicator when the character length reaches 80%

  // conditions when textarea occupied by characters up to certain %
  if (charCount > colorChange && charCount < maxCharLength) {
    curChar.style.color = "orange"; // change to orange
  } else if (charCount >= maxCharLength) {
    curChar.style.color = "red"; // change to red
  } else {
    curChar.style.color = "black"; // remain black
  }
});

// form validation 
const checkInputs = () => {
  // input values
  const wishMessageValue = wishMessage.value;
  const userNameValue = userName.value;
  const charNum = wishMessage.value.split("");
  const charCount = charNum.length; // count the character by length

  // no character input
  if (!wishMessageValue) {
    setError(wishMessage, "Please enter your message.");
    return false;
  }

  if (!userNameValue) {
    setError(userName, "Please enter your username."); // error message for inputting wrong username
    return false;
  }

  if (charCount <= 100) {
    setSuccess(wishMessage); // success message when characters are less than/ equal to 100 characters
    return true;
  }
  setError(wishMessage, "You have written more than 100 characters!"); // error message for inputting more than 100 characters
  return false;
}

// error message when no input/ more than 100 characters
const setError = (input, message) => {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector("small"); // select error message

  // error message
  errorMessage.innerText = message;

  // add error to the form class
  formControl.className = "form-control error";
}

// success message
const setSuccess = (input) => {
  const formControl = input.parentElement;

  // add success to the form class
  formControl.className = "form-control success";
}

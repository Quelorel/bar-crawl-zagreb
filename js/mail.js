// Form elements on first panel that need validation
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const phoneInput = document.querySelector("#phoneNumber");
const dateInput = document.querySelector("#date-for");
const numberOfPeopleInput = document.querySelector("#numberOfPeople");
const checkbox = document.querySelector("#checkbox");
const submitButton = document.getElementById("submit-btn");

/* Date input restriction */
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const thisDate = `${year}-${month}-${day}`;

dateInput.setAttribute("min", thisDate);

// Set initial validation status
let nameInputValidation = false;
let emailInputValidation = false;
let phoneInputValidation = false;
let numberOfPeopleValidation = false;
let isChecked = false;
let foundAboutUsValidation = false;

//Phone Input npm
const iti = window.intlTelInput(phoneInput, {
  separateDialCode: true,
  initialCountry: "hr",
  hiddenInput: "full",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.1/js/utils.js",
});

if (iti) {
  console.log(phoneInput, iti.s.dialCode);
}
window.addEventListener("mousedown", function () {
  console.log(phoneInput, iti.s.dialCode);
});

// Add event listeners to the input fields to validate on blur
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
numberOfPeopleInput.addEventListener("blur", validateNumberOfPeople);

// Validate Name
function validateName() {
  const nameValue = nameInput.value.trim();
  nameInputValidation = false;

  if (nameValue === "") {
    setErrorFor(nameInput, "This field is required!");
  } else if (!isValidName(nameValue)) {
    setErrorFor(nameInput, "Name must contain only letters and spaces");
  } else if (nameValue.length < 2) {
    setErrorFor(nameInput, "Name must be at least 2 characters long");
  } else if (nameValue.length > 20) {
    setErrorFor(nameInput, "Name must be less than 20 characters long");
  } else {
    setErrorFor(nameInput, "");
    nameInputValidation = true;
  }
}

function isValidName(name) {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}

// Validate Name
function validatePhone() {
  const phoneValue = phoneInput.value.trim();
  phoneInputValidation = false;

  if (phoneValue === "") {
    setErrorFor(phoneInput.parentElement, "This field is required!");
  } else if (!isValidPhone(phoneValue)) {
    setErrorFor(phoneInput.parentElement, "This field requires numbers");
  } else if (phoneValue.length < 6) {
    setErrorFor(
      phoneInput.parentElement,
      "Phone must be at least 6 characters long"
    );
  } else if (phoneValue.length > 20) {
    setErrorFor(
      phoneInput.parentElement,
      "Phone must be less than 20 characters long"
    );
  } else {
    setErrorFor(phoneInput.parentElement, "");
    phoneInputValidation = true;
  }
}
function isValidPhone(phone) {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
}

// Validate E-mail
function validateEmail() {
  emailInputValidation = false;
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    setErrorFor(emailInput, "This field is required!");
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(emailInput, "Please enter a valid email address");
  } else if (emailValue.length < 5) {
    setErrorFor(emailInput, "E-mail must be at least 5 characters long");
  } else {
    setErrorFor(emailInput, "");
    emailInputValidation = true;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateNumberOfPeople() {
  const numberOfPeopleValue = numberOfPeopleInput.value;

  if (numberOfPeopleValue < 1) {
    numberOfPeopleValidation = false;
    setErrorFor(numberOfPeopleInput, "Number can not be 0");
  } else {
    numberOfPeopleValidation = true;
  }
}

// Set errors function
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector(".error-message");
  errorMessage.innerText = message;
}

//Checkbox input validation
function validateChexboxInput() {
  if (checkbox.checked) {
    isChecked = true;
  } else {
    isChecked = false;
  }
}

const foundAboutUsError = document.querySelector(".error-message.foundAboutUs");

function checkVal() {
  const foundAboutUsSelectValue = document.getElementById("foundAboutUs").value;
  if (foundAboutUsSelectValue === "") {
    foundAboutUsError.innerText = "Please select one of the options";
    foundAboutUsValidation = false;
  } else {
    foundAboutUsValidation = true;
  }
}

// Checks all the inputs..
function checkInputs() {
  validateNumberOfPeople();
  validateName();
  validatePhone();
  validateEmail();
  validateChexboxInput();
  checkVal();
}

const submissionAlert = document.querySelector(".submission-alert");
const errorMessage = document.querySelector(".error-message");
const successMessage = document.querySelector(".success-message");

// Submit form function
// function submitForm(e) {
//   e.preventDefault();
//   if (
//     nameInputValidation &&
//     emailInputValidation &&
//     numberOfPeopleValidation &&
//     phoneInputValidation &&
//     isChecked &&
//     foundAboutUsValidation
//   ) {
//     submissionAlert.classList.add("show");

//     // Get form data
//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
//     var message = document.getElementById("message").value;
//     var dateFor = document.getElementById("date-for").value;
//     var phoneNumber = document.getElementById("phoneNumber").value;
//     var fullPhoneNumberValue =
//       iti.getSelectedCountryData().dialCode + " " + phoneNumber;
//     var numberOfPeople = document.getElementById("numberOfPeople").value;
//     var foundAboutUs = document.getElementById("foundAboutUs").value;

//     const scriptURL =
//       "https://script.google.com/macros/s/AKfycbxI-LsDBsf28vkADL0jY9UakGXgdSWG5ZnG1VdcD6W-Y-MRxjlLKaNNilpR8nRjoAq1/exec";
//     // const scriptURL =
//     //   "https://script.google.com/macros/s/AKfycbxI-LsDBsf28vkADL0jY9UakGXgdSWG5ZnG1VdcD6W-Y-MRxjlLKaNNilpR8nRjoAq1/exec";
//     // fetch(scriptURL, { method: "POST", body: new FormData(form) })
//     //   .then((response) => {
//     //     if (response.ok) {
//     //       successMessage.classList.add("show");
//     //     } else {
//     //       throw new Error("Form submission failed");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     errorMessage.classList.add("show");
//     //   });

//     // Send data to PHP script with AJAX request
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         successMessage.classList.add("show");
//       } else {
//         errorMessage.classList.add("show");
//       }
//     };
//     xhr.open("POST", "./phpmailer/index.php", true);
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//     xhr.send(
//       "name=" +
//         name +
//         "&email=" +
//         email +
//         "&message=" +
//         message +
//         "&fullPhoneNumberValue=" +
//         fullPhoneNumberValue +
//         "&date-for=" +
//         dateFor +
//         "&numberOfPeople=" +
//         numberOfPeople +
//         "&foundAboutUs=" +
//         foundAboutUs
//     );

//     phoneInput.parentElement.style.display = "none";
//   } else {
//     checkInputs();
//   }
// }

// submitButton.addEventListener("click", (e) => {
//   submitForm(e);
// });

function submitForm(e) {
  e.preventDefault();
  const form = document.getElementById("contact-form");
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyQp57j3RVtKyM-ZkszMbCMgq6pn1IenSN7TAdbxTJi9yyp506KBGEPHbsbolhRRn2tkQ/exec";

  if (
    nameInputValidation &&
    emailInputValidation &&
    numberOfPeopleValidation &&
    phoneInputValidation &&
    isChecked &&
    foundAboutUsValidation
  ) {
    submissionAlert.classList.add("show");

    // Get form data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var dateFor = document.getElementById("date-for").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

    var fullPhoneNumberValue =
      iti.getSelectedCountryData().dialCode + " " + phoneNumber;
    var numberOfPeople = document.getElementById("numberOfPeople").value;
    var foundAboutUs = document.getElementById("foundAboutUs").value;

    var full_number = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[full]'").val(full_number);
    console.log(full_number);

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(successMessage.classList.add("show"))
      .catch(errorMessage.classList.add("show"));

    // Send data to PHP script with AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./phpmailer/index.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        successMessage.classList.add("show");
      }
    };
    xhr.send(
      "name=" +
        name +
        "&email=" +
        email +
        "&message=" +
        message +
        "&full_number=" +
        full_number +
        "&date-for=" +
        dateFor +
        "&numberOfPeople=" +
        numberOfPeople +
        "&foundAboutUs=" +
        foundAboutUs
    );

    phoneInput.parentElement.style.display = "none";
  } else {
    checkInputs();
  }
}

submitButton.addEventListener("click", (e) => {
  submitForm(e);
});

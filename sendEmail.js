// Your code to validate your form and send the email will go here!
// All Fields are required for submission
// Make sure the Password and Confirm Password Match

// Let the user know if the passwords to not match
// Also let the user know when the email has been successfully sent
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById('form');
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const password2Error = document.getElementById('password2-error');
const inputs = document.querySelectorAll('input');
const emailValidation = new RegExp(/\w+@\w+\.\w+/);
const button = document.getElementById('button');
const confirmation = document.getElementById('confirmation');
const error = document.getElementById('error');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', (event) => {
        event.target.closest('.form-group').children[1].style.display = 'none'
    })
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    if (!validateForm(data)) {
        if (!data.firstName) {
            firstNameError.style.display = 'contents';
        }
        if (!data.LastName) {
            lastNameError.style.display = 'contents';
        }
        if (!(emailValidation.test(data.email))) {
            emailError.style.display = 'contents';
        }
        if (!validatePassword(data.password)) {
            passwordError.style.display = 'contents';
        }
        if (data.password !== data.password2 || !data.password2) {
            password2Error.style.display = 'contents';
        }
    } else {
        button.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_3efu1di';
     
        emailjs.sendForm(serviceID, templateID, this)
         .then(() => {
           button.value = 'Send Email';
           confirmation.style.display = 'flex';
           for (let i = 0; i < inputs.length; i++) {
               inputs[i].value = '';
           }
         }, (err) => {
           button.value = 'Send Email';
           console.log(err);
           error.style.display = 'flex';
         });
    }
})


const validatePassword = (password) => {
    return /[a-z]/.test(password) 
    && /[A-Z]/.test(password) 
    && /\d/.test(password) 
    && /[!@#\$%\^&\*\(\)]/.test(password)
    && password.length >= 8 
    && password.length <= 16
}

const validateForm = (form) => {
    if (!form.firstName) {
        return false;
    }
    if (!form.lastName) {
        return false;
    }
    if (!emailValidation.test(form.email)) {
        return false;
    }
    if (!validatePassword(form.password)) {
        return false;
    }
    if (form.password !== form.password2) {
        return false;
    }

    return true;
}


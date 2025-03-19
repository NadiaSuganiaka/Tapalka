const showOn = document.querySelector("#showOn");
const showOff = document.querySelector("#showOff");
const password = document.querySelector("#password");
const email = document.querySelector("input[type='email']");
const signInButton = document.querySelector("#signInButton");
const signUpButton = document.querySelector("#signUpButton");
const popup = document.querySelector("#popup");
const popupText = document.querySelector("#popupText");


const formData = {
    email: "",
    password: ""
};

function updateFormData(event) {
    formData[event.target.name] = event.target.value;
    console.log(formData);
}

function logFormDataSignUp(event) {
    event.preventDefault();
    sendReq('sign-up');
}
function logFormDataSignIn(event) {
    event.preventDefault();
    sendReq('sign-in');
}


function passwordType() {
    if(password.type === 'password'){
        password.type = 'text';
        showOn.style.opacity = "1";
        showOff.style.opacity = "0";
    } else{
        password.type = 'password';
        showOn.style.opacity = "0";
        showOff.style.opacity = "1";
    }
    
}

email.addEventListener('input', updateFormData);
password.addEventListener('input', updateFormData);

signInButton?.addEventListener('click', logFormDataSignIn);
signUpButton?.addEventListener('click', logFormDataSignUp);

showOn.addEventListener('click', passwordType);
showOff.addEventListener('click', passwordType);


function sendReq(endpoint, data){
    fetch('http://localhost:3000/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        popup.removeAttribute('class');
        popup.classList.add("popup");
        popupText.innerHTML = data.message;

        setTimeout(() => {
            popup.removeAttribute('class');
            popup.classList.add('popup-dis');
            popupText.innerHTML = '';
        }, 4000)
        console.log(data)
    })
};
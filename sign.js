const showOn = document.querySelector("#showOn");
const showOff = document.querySelector("#showOff");
const password = document.querySelector("#password");
const email = document.querySelector("input[type='email']");
const signButton = document.querySelector("button");


const formData = {
    email: "",
    password: ""
};

function updateFormData(event) {
    formData[event.target.type] = event.target.value;
    console.log(formData);
}

function logFormData(event) {
    event.preventDefault();
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

signButton.addEventListener('click', logFormData);

showOn.addEventListener('click', passwordType);
showOff.addEventListener('click', passwordType);


sendReq(endpoint, data){
    fetch('http://localhost:3000/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
    })
};
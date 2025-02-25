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
    /*console.log(formData);
    fetch("", {
        method: "post",
        headers:{
            "content-tipe": ""
        }
    })*/
}

function handleShow () {   
    if (showOn.style.opacity === "1") {
        showOn.style.opacity = "0";
        showOff.style.opacity = "1";
    } else{
        showOn.style.opacity = "1";
        showOff.style.opacity = "0";
    }   
}

function passwordType() {
    if(password.type === 'password'){
        password.type = 'text';
    } else{
        password.type = 'password';
    }
    
}

email.addEventListener('input', updateFormData);
password.addEventListener('input', updateFormData);

signButton.addEventListener('click', logFormData);

showOn.addEventListener('click', handleShow);
showOff.addEventListener('click', handleShow);
showOn.addEventListener('click', passwordType);
showOff.addEventListener('click', passwordType);

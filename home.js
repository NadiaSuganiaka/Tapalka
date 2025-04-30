const tapButton = document.querySelector('#tap');
const balance = document.querySelector('#balance');

function sendReq(endpoint){
    fetch('http://localhost:3000/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: localStorage.getItem('email')
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.balance !== undefined){
            balance.innerHTML = data.balance;
        }
    })
};

tapButton.addEventListener('click', () => {
    sendReq('click');
});

setInterval(() => {
    sendReq('passive-income');
}, 1000);
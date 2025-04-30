function sendReq(endpoint, data){
    fetch('http://localhost:3000/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("ygutrxtrwpg")
    })
};


function sendReq(endpoint, data){
    fetch('http://localhost:3000/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("ygutrxtrwpg")
    })
};


function sendReq(endpoint, data){
    fetch('http://localhost:3000/' + endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("ygutrxtrwpg")
    })
};



const locationsFn = async () => {
    const response = await fetch('http://localhost:3000/');
    const data = await response.json();
    };


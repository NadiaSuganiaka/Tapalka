const tapButton = document.querySelector('#tap');
const balance = document.querySelector('#balance');
const upgradeList = document.querySelector("ul");
const menuButton = document.querySelectorAll(".menuButton");

function getEmail() {
    return localStorage.getItem('email');
}

function createUpgrade(upgrade) {
    console.log(1)
    const li = document.createElement('li');
    li.classList.add('menuElement')
    upgradeList.appendChild(li);

    const img = document.createElement('img');
    img.setAttribute('src', upgrade.src);
    img.classList.add('menuImg');
    li.appendChild(img);

    const boostInfo = document.createElement('div');
    boostInfo.classList.add('text');
    li.appendChild(boostInfo);

    const header = document.createElement('span');
    header.classList.add('firstText');
    header.innerHTML = upgrade.name;
    boostInfo.appendChild(header);

    const description = document.createElement('span');
    description.classList.add('secondText');
    description.innerHTML = upgrade.description;
    boostInfo.appendChild(description);

    const priceWrapper = document.createElement('div');
    priceWrapper.classList.add('ollPrice');
    boostInfo.appendChild(priceWrapper);

    const coinImg = document.createElement('img');
    coinImg.classList.add('memuCoin')
    coinImg.setAttribute('src', 'img/Coin.png');
    priceWrapper.appendChild(coinImg);

    const price = document.createElement('span');
    price.classList.add('price');
    price.innerHTML = upgrade.price;
    priceWrapper.appendChild(price);

    const button = document.createElement('button');
    button.classList.add('menuButton');
    button.innerHTML = 'Buy';
    button.addEventListener('click', (event) => {
        event.preventDefault();

        fetch('http://localhost:3000/buy-upgrade/' + upgrade.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: getEmail()
            })
        })
        .then(response => response.json())
        .catch(error => {
            console.error("Upgrade error:", error);
        });
    });
    
    li.appendChild(button)
}

function createAllUpgrades() {
    getUpgrades().then(data => {
        data.upgrades.forEach(element => {
            createUpgrade(element);
        });
    })
    .catch(error => {
        console.error("Помилка при отриманні апгрейдів:", error);
    });
    
}

async function getUpgrades() {
    return fetch('http://localhost:3000/upgrades')
        .then(response => response.json());
}


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

createAllUpgrades()
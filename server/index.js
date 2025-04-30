const express = require('express');
const cors = require('cors');
const app = express();
const { encodePassword, generateToken } = require('./hesh');

app.use(cors());
app.use(express.json());

const users = []
const upgrades = [
    {
      id: 1,
      name: "Click Accelerator",
      description: "speed of earning x10",
      price: 400
    }
  ];

app.post('/sign-up', (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        return res.status(400).json({ message: "Email та пароль обов'язкові" });
    }
    if (data.password.length < 8) {
        return res.status(400).json({ message: "Пароль має містити мін. 8 символів" });  
    }
    if (users.find(user => user.email === data.email)) {
        return res.status(400).json({ message: "Користувач із таким email вже існує" }); 
    }
    console.log (data);
    const hashedPassword = encodePassword(data.password);

    users.push({ email: data.email, password: hashedPassword });

    return res.status(201).json({ message: "Реєстрація успішна!" });

});

app.post('/sign-in', (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        return res.status(400).json({ message: "Email та пароль обов'язкові" });
    }
    const user = users.find(user => user.email === data.email);
    
    if (!user || user.password !== encodePassword(data.password)) {
        return res.status(400).json({ message: "Користувач не знайдений або невірний пароль" }); 
    }

    return res.status(200).json({message: "Вхід успішний ", token: generateToken()});

});

app.get('/upgrades', (req, res) => {
    res.status(200).json({
        upgrades : upgrades
    })
});

app.get('/upgrades/:id', (req, res) => {
    let upgradeToFind = upgrades.forEach(upgrade => upgrade.id === req.body.upgrade.id)
    if(upgradeToFind) {
        res.status(200).json({
            upgrade: upgradeToFind
        })
    } else {
        res.status(404).json({
            message: "Upgrade not found"
        })
    }
});

app.post('/upgrades', (req, res) => {
    let upgradeToFind = upgrades.forEach(upgrade => upgrade.id === req.body.upgrade.id)
    if(upgradeToFind) {
        res.status(200).json({
            upgrade: upgradeToFind
        })
    } else {
        res.status(404).json({
            message: "Upgrade not found"
        });
        res.status(409).json({
            message: "Id already exists"
        });
    }
});

app.listen(3000, () =>{
    console.log('Сервер працює на http://localhost:3000');
});

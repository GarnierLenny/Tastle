const express = require('express');
const app  = express();
const faker = require('faker');
const bodyParser = require('body-parser');

// Définir la version de notre api
const versionApi = '/TastleAPI/v0.1';

// create Users list
const users = [];

for (let i = 0; i < 10; i++)
    users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(100)
    })

console.log(users);

// GET /api/v1/users
app.get(`${versionApi}/users/`, (req, res) => {
    res.json({
        data: users
    })
});

// GET /api/v1/users/:id
app.get(`${versionApi}/users/:id`, (req, res) => {
    res.json({
        data: users[req.params.id - 1] || null
    })
});

// POST /api/v1/users
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post(`${versionApi}/users`, (req, res) => {
    const data = req.body;
    
    users.push({
        firstName: data['firstName'] || undefined,
        lastName: data['lastName'] || undefined,
        age: parseInt(data['age']) || undefined
    })

    res.json({
        user_id: users.length,
        data: users[users.length - 1]
    });
});

// PUT /api/v1/users/:id
app.put(`${versionApi}/users/:id`, (req, res) => {
    const data = req.body;

    users[req.params.id - 1] = data;
    res.json({
        user_id: req.params.id,
        data: users[req.params.id - 1]
    });
});

// DELETE /api/v1/users/:id
app.delete(`${versionApi}/users/:id`, (req, res) => {
    users.splice(req.params.id - 1, 1);
    res.json({
        user_id: req.params.id,
        data: users
    });
});

app.listen(3000, () => { console.log("Listening on port 3000") });
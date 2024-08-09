const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const PORT = 8000;
const app = express();
const dataFile = './MOCK_DATA.json';

//Middleware
app.use(express.urlencoded({extended: false}));



//Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `

    return res.send(html);
})


//REST APIs

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.route('/api/user/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(user === undefined){
        return res.json({status: '404', message: 'User not found'});
    }
    
    return res.json(user);
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);
    const updateUser = {...user, ...body};
    users[id - 1] = updateUser;
    fs.writeFile(dataFile, JSON.stringify(users), (err, data) => {
        return res.json({message: 'Success'});
    })
})
.delete((req, res) => {
    const id = req.params.id;
    users.splice(id - 1, 1);

    fs.writeFile(dataFile, JSON.stringify(users), (err, data) => {
        return res.json({message: 'Success'});
    });
})

app.post('/api/user', (req, res) => {
    const body = req.body;
    
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({message: 'All fields required'});
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile(dataFile, JSON.stringify(users), (err, data) => {
        return res.status(201).json({status: 'Success', id: users.length});
    })
    console.log(body);
})

app.listen(PORT, () => console.log('Server has started'));
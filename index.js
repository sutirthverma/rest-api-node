const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const PORT = 8000;
const mongoose = require('mongoose');
const app = express();
//const dataFile = './MOCK_DATA.json';

//Connection to MongoDb
mongoose.connect('mongodb://localhost:27017/rest-api-learn')
.then(() => console.log(`MongoDB connected`))
.catch((err) => console.log(`Mongo Error: ${err.message}`))

//Schema

const userSchema = new mongoose.Schema({
    firstName : {
        type: 'String',
        required: true,
    },
    lastName: {
        type: 'String',
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    gender: {
        type: 'String',
        required: true,
    },
    jobTitle: {
        type: 'String',
    }
}, {timestamps: true});

const User = new mongoose.model('user', userSchema);

//Middleware
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});

    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join('')}
    </ul>
    `

    return res.send(html);
})


//REST APIs

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.route('/api/user/:id')
.get( async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user === undefined){
        return res.json({status: '404', message: 'User not found'});
    }
    
    return res.json(user);
})
.patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Verma"});
    return res.json({message: 'Success'});
})
.delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({message: 'Success'});
})

app.post('/api/user', async (req, res) => {
    const body = req.body;
    
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({message: 'All fields required'});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    });

    console.log(result);

    return res.status(201).json({message: 'Success'});    
})

app.listen(PORT, () => console.log('Server has started'));
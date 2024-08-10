const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const user = await User.find({});
    if(user === undefined){
        return res.json({status: '404', message: 'User not found'});
    }
    
    return res.json(user);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(user === undefined){
        return res.json({status: '404', message: 'User not found'});
    }
    
    return res.json(user);    
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Verma"});
    return res.json({message: 'Success'});
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({message: 'Success'});
}

async function handleCreateUserById(req, res) {
    const body = req.body;

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    });

    console.log(result);

    return res.status(201).json({message: 'Success', id: result._id});   
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById
}
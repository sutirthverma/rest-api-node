const express = require('express');
const router = express.Router();
const {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById
} = require('../controllers/user_controllers');

router
.route('/')
.get(handleGetAllUsers)
.post(handleCreateUserById);

router.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)


module.exports = router;
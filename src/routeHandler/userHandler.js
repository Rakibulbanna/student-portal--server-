const mongoose = require("mongoose");
const express = require("express");
const 
router = express.Router();

const {login, register, allAuthenticateUser} = require('../controllers/userController')

const authenticate = require('../config/Authenticate');


router.get('/',authenticate,allAuthenticateUser)
   
router.post('/register',register)

router.post('/login',login)



module.exports = router;

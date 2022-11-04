const mongoose = require("mongoose");
const express = require("express");
router = express.Router();

const {login, register, allAuthenticateUser} = require('../controllers/userController')

const authenticate = require('../config/Authenticate');


router.get('/',allAuthenticateUser)
   
router.post('/register',register)

router.post('/login',login)



module.exports = router;

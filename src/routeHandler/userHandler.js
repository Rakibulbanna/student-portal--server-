const mongoose = require("mongoose");
const express = require("express");
router = express.Router();

const {login, register, allAuthenticateUser} = require('../controllers/userController')



router.get('/',allAuthenticateUser)
   
router.post('/register',register)

router.post('/login',login)



module.exports = router;

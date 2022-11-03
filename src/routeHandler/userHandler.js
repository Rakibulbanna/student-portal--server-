const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {login, register} = require('../controllers/userController')

const authenticate = require('../config/Authenticate');
const User = require("../schemas/User");

router.get('/',async(req,res)=>{
    try{
        const data= await User.find({})
        res.status(200).send(data)
    }
    catch(err){
        res.status(200).send("error")
    }
})
   
router.post('/register',register)

router.post('/login',login)



module.exports = router;

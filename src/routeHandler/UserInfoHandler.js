const express = require('express');
const { authentication, checkUser } = require('../config/Authenticate');
const { paymentController, dashboard, transition, userInfoInsert, allUserInfo, allTransition } = require('../controllers/UserInfoController');
const payment = require('../schemas/payment');

const router = express.Router();


//Galib's admission form insert

// All user all information
// router.get('/',allUserInfo)

// // perticular user information form insert
// router.post('/',userInfoInsert)


//perticular user dashboard
router.get('/dashboard/:mobileNumber',authentication,checkUser,dashboard)

// perticular user payment
router.put('/payment/:mobileNumber',authentication,checkUser,paymentController)

// perticular user transition history
router.get('/transaction/:mobileNumber',authentication,checkUser,transition)

// all user transition history for Admin
// router.get('/alltransition',allTransition)

// router.delete('/deleteTransition/:mobileNumber',async (req,res)=>{
//     try{
//     await payment.deleteMany({mobileNumber:req.params.mobileNumber})
//     res.status(200).send({message:"Transition deleted"})
//     }catch(err){
//  res.status(500).send({message:"server error!"})
    
//     }

// })
module.exports = router;
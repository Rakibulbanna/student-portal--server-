const express = require('express');
const { authentication, checkUser } = require('../config/Authenticate');
const { paymentController, dashboard, transition, userInfoInsert, allUserInfo, allTransition } = require('../controllers/UserInfoController');

const router = express.Router();


//Galib's admission form insert

// All user all information
router.get('/',allUserInfo)

// perticular user information form insert
router.post('/',userInfoInsert)


//perticular user dashboard
router.get('/dashboard/:mobileNumber',authentication,checkUser,dashboard)

// perticular user payment
router.put('/payment/:mobileNumber',paymentController)

// perticular user transition history
router.get('/transaction/:mobileNumber',transition)

// all user transition history
router.get('/alltransition',allTransition)

module.exports = router;
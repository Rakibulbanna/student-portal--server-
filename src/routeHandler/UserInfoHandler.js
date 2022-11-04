const express = require('express');
const { paymentController, dashboard, transition, userInfoInsert, allUserInfo, allTransition } = require('../controllers/UserInfoController');

const router = express.Router();
const authenticate = require('../config/Authenticate');


//Galib's admission form insert

// All user all information
router.get('/',allUserInfo)

// perticular user information form insert
router.post('/',userInfoInsert)


//perticular user dashboard
router.get('/dashboard/:mobileNumber',dashboard)

// perticular user payment
router.put('/payment/:mobileNumber',paymentController)

// perticular user transition history
router.get('/transition/:mobileNumber',transition)

// all user transition history
router.get('/alltransition',allTransition)

module.exports = router;
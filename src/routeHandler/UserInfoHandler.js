const express = require('express');
const { paymentController, dashboard, transition, userInfoInsert, allUserInfo } = require('../controllers/UserInfoController');

const router = express.Router();
const authenticate = require('../config/Authenticate');
//Galib's admission form insert

router.get('/',allUserInfo)

router.post('/',userInfoInsert)

// specificSemesterAmount, semesterName, due show in dashboard

router.get('/dashboard/:mobileNumber',dashboard)

router.put('/payment/:mobileNumber',paymentController)

router.get('/transition/:mobileNumber',authenticate.authentication,transition)


module.exports = router;
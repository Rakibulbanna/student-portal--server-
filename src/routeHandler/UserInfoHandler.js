const express = require('express');
const User = require('../schemas/User');
const UserInfo = require('../schemas/UserInfo');
const router = express.Router();

//Galib's admission form insert
const departmentInfo = [
    {
        name:'SWE',
        Credit: 175,
        CostPerCredit:5000
    },
    {
        name:'CSE',
        Credit: 190,
        CostPerCredit:5000
    },
    {
        name:'EEE',
        Credit: 200,
        CostPerCredit:5000
    },
]
router.get('/',async(req,res)=>{
    try{
        const data= await UserInfo.find({})
        res.status(200).send(data)
    }
    catch(err){
        res.status(200).send("error")
    }
})
    
   


router.post('/',async(req,res)=>{
    try {
        const { mobileNumber, name,department,sscPoint,hscPoint } = req.body;
        const phone = await User.findOne({mobileNumber: mobileNumber});
        if(phone){
            const info = await departmentInfo.find(e => e.name == department);

const Totalamount = await info.Credit*info.CostPerCredit;            
const oneSemesterAmount = await Totalamount/12;
const specificSemesterAmount = await (sscPoint == 5 && hscPoint == 5)? oneSemesterAmount-((oneSemesterAmount*75)/100) : oneSemesterAmount;

          const NewUserInfo = await new UserInfo({
            name: name,
            mobileNumber: mobileNumber,
            department: department,
            sscPoint: sscPoint,
            hscPoint: hscPoint,
            semesterName:'1st',
            specificSemesterAmount:specificSemesterAmount,
            paid:0,
            totalpayable:Totalamount

        });
        await NewUserInfo.save();
        res.status(200).send("User Information inserted")  
        }
        else{
            res.status(200).send("please give that phone number that you used to open account!") 
        }       
    } 
    catch(err) {
        if (err.code === 11000) {
            res.status(500).send("This mobile number is alrady taken!");
          } else {
            res.status(500).send("server side error!");
          }
    }
})

router.get('/dashboard/:phone',async(req,res)=>{
try{



}catch(err){

}


})




module.exports = router;
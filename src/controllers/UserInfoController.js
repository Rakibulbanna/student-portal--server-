const payment = require('../schemas/payment');
const User = require('../schemas/User');
const UserInfo = require('../schemas/UserInfo');

const semester = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'];
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
// perticular user payment

module.exports.paymentController = async (req,res)=>{
    try{
    const cgpa = req.body.cgpa;
    const amount=req.body.amount

    if(amount){
        const data = await UserInfo.findOne({mobileNumber:req.params.mobileNumber});
if( data.totalpayable<=0 && data.semesterName=='12th'){
            res.send({message:"congratulatons!"})
            return;
        }
        else{
            if(data.totalpayable>=0){

                const cnt = await payment.countDocuments();
                let semesterName;
               
                if(cnt==0){
                    semesterName='1st';
                    }  
                        if(cgpa>=2.5){
                          
                        if(data.semesterName=='12th'){
                            semesterName='12th'
                        }else{
                            const i =  semester.findIndex((j)=>j==data.semesterName);
                            semesterName= semester[i+1]
                        }
                    }
                else if(cgpa<2.5){
                    semesterName = data.semesterName;
                }
                
        const paid = amount;

        let totalpayable = data.totalpayable - paid;
      //  console.log('totalpayable ',data.totalpayable,' - paid ',paid," ",totalpayable)
        let due = data.due - paid;
         const pastDeu=due;
       // console.log('due - paid'," ",due)

const info = await departmentInfo.find(e => e.name == data.department);

const Totalamount = await info.Credit*info.CostPerCredit; 

let NewoneSemesterAmount = await Totalamount/12;
NewoneSemesterAmount.toFixed(2);
 let specificSemesterAmount=0;

 if(await data.sscPoint == 5 && data.hscPoint == 5 && cgpa>=3.5){
    specificSemesterAmount =  NewoneSemesterAmount-((NewoneSemesterAmount*75)/100)
 }
 else if(await cgpa>=3.8){
    specificSemesterAmount =  NewoneSemesterAmount-((NewoneSemesterAmount*50)/100)
 }
 else{
    specificSemesterAmount=NewoneSemesterAmount;
 }
 specificSemesterAmount.toFixed(2)
//  console.log('specificSemesterAmount= ',specificSemesterAmount)
//totalpayable+=due;
due+= specificSemesterAmount;

      await UserInfo.findOneAndUpdate(
        {mobileNumber:req.params.mobileNumber},
        {
            $set: {
                paid:paid,
                totalpayable: totalpayable,
                specificSemesterAmount:specificSemesterAmount,
                pastDeu:pastDeu,
                due:due,
                semesterName:semesterName
            }
        },
        {
            useFindAndModify: false,
            new: true,
          }
         );
         const NewPayment = new payment({
            mobileNumber:req.params.mobileNumber,
            semesterName:semesterName,
            paid:paid,
            totalpayable: totalpayable,
            due:due,

        })
        await NewPayment.save();
        res.status(200).send({message:"all set success!"})
}

    else{
        const data = await UserInfo.findOne({mobileNumber:req.params.mobileNumber});
        const cnt = await payment.countDocuments();
                let semesterName;
                if(cnt==0){
                    semesterName='1st';
                    }  
                        if(cgpa>=2.5){
                        if(data.semesterName=='12th'){
                            semesterName='12th'
                        }else{
                            const i =  semester.findIndex((j)=>j==data.semesterName);
                            semesterName= semester[i+1]
                        }
                        }
                await UserInfo.findOneAndUpdate(
                    {mobileNumber:req.params.mobileNumber},
                    {
                        $set: {
                            semesterName:semesterName
                        }
                    },
                    {
                        useFindAndModify: false,
                        new: true,
                      }
                     );
        const NewPayment = new payment({
            mobileNumber:req.params.mobileNumber,
            semesterName:semesterName,
            paid:data.paid,
            totalpayable: data.totalpayable,
            due:data.due,

        })
        await NewPayment.save();

        // if(!flag){
        //     res.status(304).send("user didn't pass the semester but all set success!")
        // }
        // else{
           res.status(200).send({message:"all set success!"}) 
        //  }
        
    }
 }
}
    else{
        res.status(200).send({message:"payment amount missing!"})
    }
 }
 catch(err){
    if (err) {
       // console.log(err)
        res.status(500).json({ message: "updated failed!!" });
      } else {
        //console.log(data);
        res.status(200).json({ message: "updated successfully!!" });
      }
 }
}
//perticular user dashboard

module.exports.dashboard = async(req,res)=>{
    try{
        const data= await UserInfo.findOne({mobileNumber: req.params.mobileNumber}).select('specificSemesterAmount totalpayable due pastDeu semesterName');
        if(data){
            res.status(200).send(data)
        }
        else{
            res.status(200).send("user data not found!")
        }
       
    }
    catch(err){
        res.status(200).send("error")
    }
}
// perticular user transition history

module.exports.transition = async(req,res)=>{
    try{
    const data = await payment.find({mobileNumber:req.params.mobileNumber});
    res.send(data)
    }
    catch(err){
    res.status(200).send({message:"server error!"})
}
    
}
// perticular user information form insert

module.exports.userInfoInsert = async(req,res)=>{
    try {
        const { mobileNumber, name,department,sscPoint,hscPoint } = req.body;
        const phone = await User.findOne({mobileNumber: mobileNumber});
        if(phone){
            const info = await departmentInfo.find(e => e.name == department);

const Totalamount = await info.Credit*info.CostPerCredit;            
const oneSemesterAmount = await Totalamount/12;
const specificSemesterAmount = await (sscPoint == 5 && hscPoint == 5)? oneSemesterAmount-((oneSemesterAmount*75)/100) : oneSemesterAmount;
const paid = 0; 
const dueInoneSemester = oneSemesterAmount-paid;
          const NewUserInfo = await new UserInfo({
            name: name,
            mobileNumber: mobileNumber,
            department: department,
            sscPoint: sscPoint,
            hscPoint: hscPoint,
            semesterName:'1st',
            specificSemesterAmount:specificSemesterAmount,
            paid:paid,
            totalpayable:Totalamount,
            due:dueInoneSemester,
            pastDeu:0

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
}
// All user all information
module.exports.allUserInfo = async(req,res)=>{
    try{
        const data= await UserInfo.find({})
        res.status(200).send(data)
    }
    catch(err){
        res.status(200).send("error")
    }
}
// all user transition
module.exports.allTransition=async(req,res)=>{
    try{
        const data = await payment.find({});
        res.send(data)
        }
        catch(err){
        res.status(200).send({message:"server error!"})
        } 
}
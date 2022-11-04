const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const { serverError, resourceError } = require("../util/error");
const User = require("../schemas/User");
const UserInfo = require("../schemas/UserInfo");


// login controller
module.exports.login = async (req, res) => {
  let { mobileNumber, password } = req.body;
  let validate = loginValidator({ mobileNumber, password });

  if (!validate.isValid) {
    return res.status(400).json(validate.error);
  }

  await User
    .findOne({ mobileNumber })
    // Use Populate for transaction
    .then((u) => {
      if (!u) {
        return resourceError(res, "User Not Found");
      }
      bcrypt.compare(password, u.password,async (err, result) => {
        if (err) {
          return serverError(res, err);
        }
        if (!result) {
          return resourceError(res, "Password Doesn't Match");
        }

  // generate JWT Token 

        let token = jwt.sign(
          {
            _id: u._id,
            mobileNumber: u.mobileNumber,
          },
          "RAKIB",
          { expiresIn: "2h" }
        );
          
        const userInfodata=  await UserInfo.findOne({ mobileNumber: mobileNumber })
          
        if(userInfodata){
          res.status(200).json({
          admitted: true,
          mobileNumber: u.mobileNumber,
          message: "Login Successful",
          token: `Bearer ${token}`,
            })
        }
          else{
          res.status(200).json({
          admitted: true,
          mobileNumber: u.mobileNumber,
          message: "Login Successful",
          token: `Bearer ${token}`,
        });
        }
        
      });
    })
    .catch((error) => serverError(res, error));

};

// Registration controller
module.exports.register = async (req, res) => {
  let { mobileNumber, password } = req.body;
  let validate = registerValidator({ mobileNumber, password });

  if (!validate.isValid) {
    return res.status(400).json(validate.error);
  } else {
    
      
    await  User.findOne({ mobileNumber }).then((u) => {
        if (u) {
          return resourceError(res, "mobile Number Already Exist");
        }

        bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
            console.log(err);
            return resourceError(res, "Server Error Occurred");
          }

          const newuser = new User({
            mobileNumber,
            password: hash,
          });

          
            newuser.save()
            .then((u) => {
              res.status(201).json({
                message: "User Created Successfully",
                //u,
              });
            })
            .catch((error) => serverError(res, error));
        });
      })
      .catch((error) => serverError(res, error));
  }
};
// all AuthenticateUser

module.exports.allAuthenticateUser = async(req,res)=>{
  try{
      const data= await User.find({})
      res.status(200).send(data)
  }
  catch(err){
      res.status(200).send("error")
  }
}
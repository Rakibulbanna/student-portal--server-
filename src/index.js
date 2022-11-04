const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const app = express();
const port = process.env.PORT || 5001;

const userHandler = require('./routeHandler/userHandler')
const UserInfoHandler = require('./routeHandler/UserInfoHandler');

app.use(express.json());
require("dotenv").config();

app.use(cors())

app.use(passport.initialize())
require('./config/passport')(passport)


const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lscxpuy.mongodb.net/StudentPortal?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connection successful!"))
  .catch((error) => console.log(error));


    app.use('/user',userHandler);
    app.use('/userInfo',UserInfoHandler);
    
    

app.get("/", (req, res) => {
  res.send("server is running in 5001 port");
});

app.use((err,req,res,next)=>{
  // because err.status is undefined 
   res.status(404).json({
       error : {
           message : err.message
      }
   });
})

app.listen(port, () => {
  console.log("server is running at 5001 port");
});

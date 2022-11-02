const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const authenticate = require('../config/Authenticate')


const questionSchema = require("../schemas/questionSchema");
const TeamMember = require("../schemas/About/TeamMember");

const question = new mongoose.model("questions", questionSchema);




// all question getting
router.get("/", async (req, res) => {
  try {
  // ***** array size count
    //const data = await question.countDocuments({})
    const data = await question.find({})
  // const data = await question.find({}).select({
  //   _id:0,
  //   questionMakerID:0,
  //   question:0,
  //   reply:0,
  //   __v:0
  // })
  //let arr=[];
  // const b = data.map((i)=>{
  //  arr.push(i.Comments.length)
  // })

  // for (let i of data){
  //   arr.push(i.Comments.length)
  // }

  //const b = data[0].Comments.length
    res.status(200).json(data);
  } catch (err) {
    console.log(err)
    res.status(500).send("server side error!");
  }
});


// get only comments
router.get("/comments", async (req, res) => {
  try {
    const data = await question.find({}).select('Comments')

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

// question adding
router.post("/insert-question",authenticate, async (req, res) => {
  const newQuestion = new question(req.body);
  try {
    const data = await newQuestion.save();
    res.status(200).json({
      message: "question inserted successfully",
      data: data,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).send("This question is alrady taken!");
    } else {
      res.status(500).send("server side error!");
    }
  }
});

//reply adding
router.post("/addcomments", async (req, res) => {
  await question.update(
    { _id: req.body._id },
    {
      $push: {
        Comments: {
          description: req.body.description,
          replyerID: req.body.CommentsID,
        },
      },
    },
    
    (err, data) => {
      if (err) {
        res.status(500).send("reply insertion failed!!");
      } else {
        console.log(data)
        res.status(200).send({"data":data,"message":"reply inserted!!"});
      }
    }
  );
});

// reply deleting
router.delete("/commentdelete", async (req, res) => {

 await question.findOneAndUpdate(
    { _id: req.body.questionId },
    {
      $pull: {
        Comments: {
           _id: req.body.CommentsID 
          }
      }
     },
     {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "Comment deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Comment deleted successfully!!" });
    }
  });
  
});
// reply updaing
router.put("/commentupdate", async (req, res) => {

 await question.findOneAndUpdate(
    { question: req.body.question, "Comments.description":req.body.description},
    {
      $set: {
        "Comments.$.description": req.body.target
      }
     },
     {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "Comment updated failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Comment updated successfully!!" });
    }
  });
  
});

module.exports = router;

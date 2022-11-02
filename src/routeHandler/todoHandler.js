const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);



//get active todoes by instence method
router.get('/active',async(req,res)=>{
  const todo = new Todo();
  const data = await todo.findActive();

  res.status(200).json(data)

})
//get active todoes by instence method in callback way
router.get('/active-callback',async(req,res)=>{
  const todo = new Todo();
todo.findActiveCallback((err,data)=>{

   res.status(200).json(data) 
});
});

// get active todoes by static methods
router.get('/js',async(req,res)=>{

  try{
   const data = await Todo.findByJS();
  res.status(200).json(data)  
  }
  catch(err){
    console.log(err)
  }
  
});

// get todo by language in user define Query Helpers

router.get('/language',async(req,res)=>{

  try{
   const data = await Todo.find().byLanguage('to');
  res.status(200).json(data)  
  }
  catch(err){
    console.log(err)
  }
  
});

//get all todoes
router.get("/", async (req, res) => {
  await Todo.find({
    status: "active",
  }).exec((err, data) => {
    if (err) {
      res.status(500).send("server side error!");
    } else {
      res.status(200).json(data);
    }
  });
});

//if I want to get selected attribute value and get only 2 data

router.get("/selected", async (req, res) => {
  // Todo.find(
  //     {
  //         status:'active'
  //     }

  // ).select({
  //     _id : 0,
  //     __v : 0,
  //     date: 0
  // })
  // .limit(2) //get only 2 data
  // .exec((err,data)=>{
  //     if (err) {
  //           res.status(500).send("server side error!");
  //       }
  //     else {
  //         res.status(200).json(data);
  //  }
  // })

  try {
    const data = await Todo.find({ status: "active" })
      .select("title description") //if I want to select only "title","description"
        //.select({
        //     _id : 0,
        //     __v : 0, // If I want not to load _id,__v and date data
        //     date: 0
        // })
      .limit(2);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//get todo by id
router.get("/:id", async (req, res) => {
  /// Approch 1 using callback function way

  //  await Todo.find({_id: req.params.id},(err,data)=>{
  //       if (err) {
  //           res.status(500).send("server side error!");
  //       }
  //     else {
  //         res.status(200).json(data);
  //  }
  //   })

  /// Approch 2 using async-await way

  try {
    const data = await Todo.find({ _id: req.params.id });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);

  // await newTodo.save((err) => {
  //   if (err) {
  //     if (err.code === 11000) {
  //       res.status(500).send("This todo is alrady taken!");
  //     } else {
  //       res.status(500).send("server side error!");
  //     }
  //   } else {
  //     res.status(200).json({
  //       message: "todo inserted successfully",
  //     });
  //   }
  // });

  try {
    const data = await newTodo.save();
    res.status(200).json({
      message: "todo inserted successfully",
      data: data,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).send("This todo is alrady taken!");
    } else {
      res.status(500).send("server side error!");
    }
  }
});

//post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "server side error",
      });
    } else {
      res.status(200).json({
        message: "Some todoes inserted successfully",
      });
    }
  });
});
//put todoes
router.put("/:id", async (req, res) => {
  await Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "updating error!" });
    } else {
      console.log(data);
      res.status(200).json({ message: "updated successfully!" });
    }
  });
});
//delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;

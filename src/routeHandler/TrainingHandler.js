const express = require("express");
const Assessment = require("../schemas/Training/Assessment");
const Customized = require("../schemas/Training/Customized");
const Management = require("../schemas/Training/Management");
const Security = require("../schemas/Training/SecurityTraining");
const Training = require("../schemas/Training/Training");

const router = express.Router();

//DONE get

router.get("/allTrainning", async (req, res) => {
  try {
    const data = await Training.find({}); 
    //  const data = await Training.find({}).populate('Assessment')
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allAssesment", async (req, res) => {
  try {
    const data = await Assessment.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allCustomized", async (req, res) => {
  try {
    const data = await Customized.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allManagement", async (req, res) => {
  try {
    const data = await Management.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allSecurity", async (req, res) => {
  try {
    const data = await Security.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//Edit Needed post

router.post("/addAssessment", async (req, res) => {
  try {
      const NewAssessment = new Assessment(req.body);
      await NewAssessment.save();
      res.status(200).send("Assessment inserted")
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Assessment is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});
router.post("/addCustomized", async (req, res) => {
  
  try {
    const NewCustomized = new Customized(req.body);
    await NewCustomized.save();
    res.status(200).send("Customized inserted");
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Customized is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});
router.post("/addManagement", async (req, res) => {
  const NewManagement = new Management(req.body);
  try {
    const data = await NewManagement.save();
    //console.log(data);
    const data2 = await Training.countDocuments({});
  if (data2) {
      const p_data = await Training.find({}).select('_id');
      const p_id = p_data[0]._id.toString();
        await Training.updateOne(
        { _id: p_id},
        {
          $push: {
            Management: [
              data._id
            ]
          },
        });
        res.send("inserted Management!")
      }
  else{
        const seed = new Training({
       Management: [
        data._id
      ]
    });
    await seed.save()
    res.send("Management inserted with main parents")
    }
    
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Management is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});
router.post("/addSecurity", async (req, res) => {
  const NewSecurity = new Security(req.body);
  try {
    const data = await NewSecurity.save();
    //console.log(data);
    const data2 = await Training.countDocuments({});
  if (data2) {
      const p_data = await Training.find({}).select('_id');
      const p_id = p_data[0]._id.toString();
        await Training.updateOne(
        { _id: p_id},
        {
          $push: {
            Security: [
              data._id
            ]
          },
        });
        res.send("inserted Security!")
      }
  else{
        const seed = new Training({
        Security: [
        data._id
      ]
    });
    await seed.save()
    res.send("Security inserted with main parents")
    }
    
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Security is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});

// DONE delete

router.delete("/Assessment/:id",async(req,res)=>{
  try{
    await Assessment.deleteOne({ _id:  req.params.id})
    res.status(200).send("Assessment deleted!")
  }
  catch(err){
  if (err) {
      res.status(500).json({ message: "Assessment deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Assessment deleted successfully!!" });
    }
  
  }
});
router.delete("/Customized/:id",async(req,res)=>{
  try{
    await Customized.deleteOne({ _id:  req.params.id})
    res.status(200).send("Customized deleted!")
  }
  catch(err){
  if (err) {
      res.status(500).json({ message: "Customized deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Customized deleted successfully!!" });
    }
  
  }
});
router.delete("/Management/:id",async(req,res)=>{
  try{
    await Management.deleteOne({ _id:  req.params.id})
    res.status(200).send("Management deleted!")
  }
  catch(err){
  if (err) {
      res.status(500).json({ message: "Management deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Management deleted successfully!!" });
    }
  
  }
});
router.delete("/Security/:id",async(req,res)=>{
  try{
    await Security.deleteOne({ _id:  req.params.id})
    res.status(200).send("Security deleted!")
  }
  catch(err){
  if (err) {
      res.status(500).json({ message: "Security deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Security deleted successfully!!" });
    }
  
  }
});
module.exports = router;

const express = require("express");
const AssociationCarosor = require("../schemas/HomePage/AssociationCarosor");
const BannerCarosor = require("../schemas/HomePage/BannerCarosor");
const ServicesCarosor = require("../schemas/HomePage/ServicesCarosor");
const { route } = require("./todoHandler");
const router = express.Router();

//Banner section

router.get("/banner", async (req, res) => {
  try {
    const data = await BannerCarosor.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

router.post("/banner", async (req, res) => {
  const newBanner = new BannerCarosor(req.body);
  try {
    const size = await BannerCarosor.find();

    if (size.length < 9) {
      try {
        const data = newBanner.save();
        res.status(200).json({
          message: "BannerCarosor inserted successfully",data:data
        });
      } catch (err) {
        res.status(500).send({
          message: "server side error!",
        });
      }
    } else {
      res.status(500).send({
        message: "more then 9 carosor are not allowed!,Insertion failed!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});

router.put("/banner", async (req, res) => {
  //console.log(req.body)
  await BannerCarosor.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        title: req.body?.title,
        subtitle: req.body?.subtitle,
        photoURL: req.body?.photoURL,
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
      //console.log(data);
      res.status(200).json({ message: "updated successfully!" });
    }
  });
});

// Service section

router.post("/service", async (req, res) => {
  const NewServices = new ServicesCarosor(req.body);
      try {
        const data = NewServices.save();
        res.status(200).json({
          message: "New Services inserted successfully",
        });
      } catch (err) {
        res.status(500).send({
          message: "server side error!",
        });
      } 
});

router.get('/service',async (req,res)=>{
  try {
    const data = await ServicesCarosor.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

router.put("/service", async (req, res) => {
  //console.log(req.body)
  await ServicesCarosor.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        title: req.body?.title,
        subtitle: req.body?.subtitle,
        photoURL: req.body?.iconURL,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "Services Carosor updating error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Services Carosor updated successfully!" });
    }
  });
});

router.delete("/service",async(req,res)=>{

await ServicesCarosor.deleteOne({_id : req.body.id},{},(err,data)=>{
  if (err) {
    res.status(500).json({ message: "Services Carosor deleteting error!" });
  } else {
    //console.log(data);
    res.status(200).json({ message: "Services Carosor deleted successfully!",mongooseDeleteResult: data });
  }
})
})

// Association Carosor 

router.post("/association", async (req, res) => {
  const NewAssociation = new AssociationCarosor(req.body);
      try {
        const data = NewAssociation.save();
        res.status(200).json({
          message: "New Association inserted successfully",
        });
      } catch (err) {
        res.status(500).send({
          message: "server side error!",
        });
      } 
});
router.delete('/association',async(req,res)=>{
  
  await AssociationCarosor.deleteOne({_id:req.body.id},(err,data)=>{
    if (err) {
      res.status(500).json({ message: "Association Carosor deleteting error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Association Carosor deleted successfully!",mongooseDeleteResult: data });
    }
  })
  })

  // partner carosel
  




module.exports = router;

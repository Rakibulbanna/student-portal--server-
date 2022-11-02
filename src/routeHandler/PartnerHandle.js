const express = require("express");
const Partners = require("../schemas/Partners/Partners");
const router = express.Router();

//getting partner

router.get("/Service", async (req, res) => {
  try {
    const data = await Partners.find({}).select('ServicePartner');

    res.status(200).json(data[0].ServicePartner);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/Solution", async (req, res) => {
  try {
    const data = await Partners.find({}).select('SolutionPartner');

    res.status(200).json(data[0].SolutionPartner);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/Association", async (req, res) => {
  try {
    const data = await Partners.find({}).select('Association');

    res.status(200).json(data[0].Association);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//partner Insert Section

const firstInsert = async (e) => {
  const newCollection = Partners({
    ServicePartner: [
      {
        name: e?.ServicePartnerName || "",
        url: e?.ServicePartnerUrl || "",
      },
    ],
    SolutionPartner: [
      {
        name: e?.SolutionPartnerName || "",
        url: e?.SolutionPartnerUrl || "",
      },
    ],
    Association: [
      {
        name: e?.AssociationName || "",
        url: e?.AssociationUrl || "",
      },
    ],
  });

  await newCollection.save((err) => {
    if (err) {
      res.status(500).json({ message: "Table creation failed!!" });
    } else {
      console.log("table inserted successfully");
    }
  });
};

router.post("/addService", async (req, res) => {
  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      Association: 0,
      SolutionPartner: 0,
      reply: 0,
      __v: 0,
    });
const count = await dd[0].ServicePartner.length;

const flagName =  await dd[0].ServicePartner[0].name;
const flagUrl = await dd[0].ServicePartner[0].url;

    if (count === 1 && flagName ==="" && flagUrl==="") {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = await dd[0]._id.toString();
const c_id = await dd[0].ServicePartner[0]._id.toString();

console.log(p_id,"   ",c_id)

      await Partners.findOneAndUpdate({
        _id: p_id, "ServicePartner._id": c_id
      },
        {
          $set: {
            "ServicePartner.$.name": req.body?.ServicePartnerName,
            "ServicePartner.$.url": req.body?.ServicePartnerUrl,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "ServicePartner updated failed!!" });
        } else {
          res.status(200).json({
            message: "ServicePartner updated successfully",
            data: data,
          });
        }
      });
    }
     else {
      
      const id = dd[0]._id.toString() 

      await Partners.updateOne(
        { _id: id},
        {
          $push: {
            ServicePartner: {
              name: req.body?.ServicePartnerName || "",
              url: req.body?.ServicePartnerUrl || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("ServicePartner insertion failed!!");
          } else {
            // console.log(data)
            res.status(200).send({ data: data, message: "ServicePartner inserted!!" });
          }
        }
      );
    }
  } 
else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "ServicePartnerName.$.name": req.body?.ServicePartnerName,
          "ServicePartnerUrl.$.url": req.body?.ServicePartnerUrl,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec((err, data) => {
      if (err) {
        res.status(500).json({ message: "ServicePartner updated failed!!" });
      } else {
        res.status(200).json({
          message: "ServicePartner inserted successfully",
          data: data,
        });
      }
    });
  }
});

router.post("/addSolution", async (req, res) => {
  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      Association: 0,
      ServicePartner: 0,
      reply: 0,
      __v: 0,
    });
const count = await dd[0].SolutionPartner.length;
const flagName =  await dd[0].SolutionPartner[0].name;
const flagUrl = await dd[0].SolutionPartner[0].url;

    if (count === 1 && flagName ==="" && flagUrl==="") {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = await dd[0]._id.toString();
const c_id = await dd[0].SolutionPartner[0]._id.toString();

console.log(p_id,"   ",c_id)

      await Partners.findOneAndUpdate({
        _id: p_id, "SolutionPartner._id": c_id
      },
        {
          $set: {
            "SolutionPartner.$.name": req.body?.SolutionPartnerName,
            "SolutionPartner.$.url": req.body?.SolutionPartnerUrl,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "SolutionPartner updated failed!!" });
        } else {
          res.status(200).json({
            message: "SolutionPartner updated successfully",
            data: data,
          });
        }
      });
    }
     else {
      const id = dd[0]._id.toString() 

      await Partners.updateOne(
        { _id: id},
        {
          $push: {
            SolutionPartner: {
              name: req.body?.SolutionPartnerName || "",
              url: req.body?.SolutionPartnerUrl || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("SolutionPartner insertion failed!!");
          } else {
            // console.log(data)
            res.status(200).send({ data: data, message: "SolutionPartner inserted!!" });
          }
        }
      );
    }
  } 
else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "SolutionPartnerName.$.name": req.body?.SolutionPartnerName,
          "SolutionPartnerUrl.$.url": req.body?.SolutionPartnerUrl,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec((err, data) => {
      if (err) {
        res.status(500).json({ message: "SolutionPartner updated failed!!" });
      } else {
        res.status(200).json({
          message: "SolutionPartner inserted successfully",
          data: data,
        });
      }
    });
  }
});

router.post("/addAssociation", async (req, res) => {
  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      SolutionPartner: 0,
      ServicePartner: 0,
      reply: 0,
      __v: 0,
    });
const count = await dd[0].Association.length;
const flagName =  await dd[0].Association[0].name;
const flagUrl = await dd[0].Association[0].url;

    if (count === 1 && flagName ==="" && flagUrl==="") {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = await dd[0]._id.toString();
const c_id = await dd[0].Association[0]._id.toString();

console.log(p_id,"   ",c_id)

      await Partners.findOneAndUpdate({
        _id: p_id, "Association._id": c_id
      },
        {
          $set: {
            "Association.$.name": req.body?.AssociationName,
            "Association.$.url": req.body?.AssociationUrl,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "Association updated failed!!" });
        } else {
          res.status(200).json({
            message: "Association updated successfully",
            data: data,
          });
        }
      });
    }
     else {
      const id = dd[0]._id.toString() 

      await Partners.updateOne(
        { _id: id},
        {
          $push: {
            Association: {
              name: req.body?.AssociationName || "",
              url: req.body?.AssociationUrl || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("Association insertion failed!!");
          } else {
            // console.log(data)
            res.status(200).send({ data: data, message: "Association inserted!!" });
          }
        }
      );
    }
  } 
else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "AssociationName.$.name": req.body?.AssociationName,
          "AssociationUrl.$.url": req.body?.AssociationUrl,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec((err, data) => {
      if (err) {
        res.status(500).json({ message: "Association updated failed!!" });
      } else {
        res.status(200).json({
          message: "Association inserted successfully",
          data: data,
        });
      }
    });
  }
});

// partner delete section
 
router.delete("/Service/:id", async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();
  await Partners.findOneAndUpdate(
     { _id: id},
     {
       $pull: {
        ServicePartner: {
            _id: req.params.id 
           }
       }
      },
      {
       useFindAndModify: false,
       new: true,
     }
   ).exec((err, data) => {
     if (err) {
       res.status(500).json({ message: "ServicePartner deletion failed!!" });
     } else {
       //console.log(data);
       res.status(200).json({ message: "ServicePartner deleted successfully!!" });
     }
   });
   
 });

router.delete("/Solution/:id", async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();
  await Partners.findOneAndUpdate(
     { _id: id},
     {
       $pull: {
        SolutionPartner: {
            _id: req.params.id 
           }
       }
      },
      {
       useFindAndModify: false,
       new: true,
     }
   ).exec((err, data) => {
     if (err) {
       res.status(500).json({ message: "SolutionPartner deletion failed!!" });
     } else {
       //console.log(data);
       res.status(200).json({ message: "SolutionPartner deleted successfully!!" });
     }
   });
   
 });

router.delete("/Association/:id", async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();
  await Partners.findOneAndUpdate(
     { _id: id},
     {
       $pull: {
        Association: {
            _id: req.params.id 
           }
       }
      },
      {
       useFindAndModify: false,
       new: true,
     }
   ).exec((err, data) => {
     if (err) {
       res.status(500).json({ message: "Association deletion failed!!" });
     } else {
       //console.log(data);
       res.status(200).json({ message: "Association deleted successfully!!" });
     }
   });
   
 });

//partner update section
router.put("/Service/:id",async(req,res)=>{
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();

  await Partners.findOneAndUpdate({
    _id: id, "ServicePartner._id": req.params.id
  },
    {
      $set: {
        "ServicePartner.$.name": req.body?.ServicePartnerName,
        "ServicePartner.$.url": req.body?.ServicePartnerUrl,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "ServicePartner updated failed!!" });
    } else {
      res.status(200).json({
        message: "ServicePartner updated successfully",
        // data: data,
      });
    }
  });
})

router.put("/Solution/:id",async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();

      await Partners.findOneAndUpdate({
        _id: id, "SolutionPartner._id": req.params.id
      },
        {
          $set: {
            "SolutionPartner.$.name": req.body?.SolutionPartnerName,
            "SolutionPartner.$.url": req.body?.SolutionPartnerUrl,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "SolutionPartner updated failed!!" });
        } else {
          res.status(200).json({
            message: "SolutionPartner updated successfully",
            // data: data,
          });
        }
      });
});

router.put("/Association/:id",async(req,res)=>{
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();

  await Partners.findOneAndUpdate({
    _id: id, "Association._id": req.params.id
  },
    {
      $set: {
        "Association.$.name": req.body?.AssociationName,
        "Association.$.url": req.body?.AssociationUrl,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "Association updated failed!!" });
    } else {
      res.status(200).json({
        message: "Association updated successfully",
        // data: data,
      });
    }
  });
})

module.exports = router;

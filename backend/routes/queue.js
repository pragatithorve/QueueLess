const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");

// ADD TOKEN
router.post("/add", async (req,res)=>{
  const {name,service,time,isVIP} = req.body;

  // same time block
  let exist = await Queue.findOne({service,time});
  if(exist){
    return res.status(400).json({msg:"Time already booked"});
  }

  let q = await Queue.create({name,service,time,isVIP});
  res.json(q);
});

// GET ALL
router.get("/:service", async (req,res)=>{
  let data = await Queue.find({service:req.params.service})
  .sort({isVIP:-1, time:1});

  res.json(data);
});

// NEXT TOKEN
router.post("/next/:service", async (req,res)=>{
  let next = await Queue.findOne({service:req.params.service})
  .sort({isVIP:-1, time:1});

  if(!next) return res.json(null);

  await Queue.findByIdAndDelete(next._id);
  res.json(next);
});

// RESET
router.delete("/reset/:service", async (req,res)=>{
  await Queue.deleteMany({service:req.params.service});
  res.json({msg:"Reset done"});
});

module.exports = router;
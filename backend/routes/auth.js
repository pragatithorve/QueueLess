const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req,res)=>{
  const {username,password} = req.body;

  let exist = await User.findOne({username});
  if(exist){
    return res.status(400).json({msg:"User already exists"});
  }

  await User.create({username,password});
  res.json({msg:"Registered"});
});

// LOGIN
router.post("/login", async (req,res)=>{
  const {username,password} = req.body;

  let user = await User.findOne({username,password});
  if(!user){
    return res.status(400).json({msg:"Invalid username or password"});
  }

  res.json({msg:"Login success"});
});

module.exports = router;
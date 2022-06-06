var express = require('express');
var router = express.Router();
let userSchema = require('../schema/schema')
let userVerificationSchema = require('../schema/verifyschema')
let nodemailer = require('nodemailer')
// let {v4: uuidv4} = require('uuid')
require("dotenv").config();
let {encryptPwd, decrypetPwd} = require('../schema/crypt')

// transporter for env so it cant be visible
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
})

// testing the env
transporter.verify((error, success) => {
  if(error){
    console.log(error)
  } else 
  {
    console.log('ready for messages')
    console.log(success)
  }
})


/* GET users listing. */
router.get('/display', async function(req, res) {
  try{
    const result = await userSchema.find()
    res.json({
      message: 'Displaying',
      data : result
    })  
  }
  catch (err) {
    console.log(err);
  }
});

router.post('/register', async function(req, res){
  try{
  const user = await userSchema.findOne({email:req.body.email})
  if(user)
  {
    res.send('user already exists')
  }
  else{
    const encodePwd = await encryptPwd(req.body.password)
    req.body.password = encodePwd
    await userSchema.create(req.body)
    res.send('Account created')
    sendVerificationEmail(result, res)
  }
  }
  catch (err) {
    console.log(err)
  }
});

router.post('/login', async function (req, res) {
  try{
    const user = await userSchema.findOne({email:req.body.email})
    if(user)
    {
      let result= decrypetPwd(req.body.password, user.password)
      if(result)
      {
        res.send('Login success')
      }
      else{
        res.send('Wrong password')
      }
    }
    else{
      res.send('create an account to login')
    }
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router;

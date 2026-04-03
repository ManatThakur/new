const express=require('express');
const formControl=require('../controller/formControl');
const hostController = require('../controller/hostController');
const path = require('path');
const rootdir=require('../util/path');
const formRouter=express.Router();

const bodyParser = require('body-parser');
formRouter.use(bodyParser.urlencoded({ extended: true }));
formRouter.get("/form",(req,res,next)=>{
  console.log("Hello world route accessed",req.method,req.url,req.body);
  res.sendFile(path.join(rootdir, 'view', 'form.html'));
 
});
formRouter.post("/form",(req,res,next)=>{
  console.log("2nd route accessed",req.method,req.url,req.body);
 res.send(`Form submitted. Name: ${req.body.homeName}, Address: ${req.body.address}, Price: ${req.body.price}, Rooms: ${req.body.rooms}`);

});
module.exports=formRouter;
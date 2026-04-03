const express=require('express');
const path = require('path');
const rootdir=require('../util/path');
const formRouter=express.Router();
const detail=[];
const bodyParser = require('body-parser');
formRouter.use(bodyParser.urlencoded({ extended: true }));
formRouter.get("/form",(req,res,next)=>{
  console.log("Hello world route accessed",req.method,req.url,req.body);
  res.sendFile(path.join(rootdir, 'view', 'form.html'));
 //res.redirect('/'); not here bcoz it redirect page to home
});
formRouter.post("/form",(req,res,next)=>{
  console.log("2nd route accessed",req.method,req.url,req.body);
 res.send(`Form submitted. Name: ${req.body.homeName}, Address: ${req.body.address}, Price: ${req.body.price}, Rooms: ${req.body.rooms}, Image: ${req.body.image}`);
 detail.push({
    homeName: req.body.homeName,
    address: req.body.address,
    price: req.body.price,
    rooms: req.body.rooms,
    image: req.body.image
  });
  res.redirect('/');
});
exports.detail=detail;
exports.router=formRouter;
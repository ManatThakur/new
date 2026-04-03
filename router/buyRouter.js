const express=require('express');
const buyRouter=express.Router();
const buyControl=require('../controller/buyController');
buyRouter.get('/buy',buyControl.getBuyHome);

module.exports=buyRouter;
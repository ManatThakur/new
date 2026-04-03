const express=require('express');
const buyRouter=express.Router();
const path = require('path');
const rootdir=require('../util/path');
const {detail}=require('./formRouter');
buyRouter.get('/buy', (req, res) => {
 
res.sendFile(path.join(rootdir, 'view', 'buy.html'));
console.log("Buy details:", detail);

});
module.exports=buyRouter;
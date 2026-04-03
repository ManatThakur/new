const express=require('express');
const buyRouter=express.Router();
const path = require('path');
const rootdir=require('../util/path');
buyRouter.get('/buy', (req, res) => {
 
res.sendFile(path.join(rootdir, 'view', 'buy.html'));
});
module.exports=buyRouter;
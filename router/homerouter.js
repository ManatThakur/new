const express=require('express');
const homeRouter=express.Router();
const path = require('path');
const rootdir=require('../util/path');
homeRouter.get('/', (req, res) => {
 
res.sendFile(path.join(rootdir, 'view', 'rename.html'));
});
module.exports=homeRouter;
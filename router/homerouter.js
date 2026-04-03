const express=require('express');
const homeRouter=express.Router();
const path = require('path');
const rootdir=require('../util/path');

const {detail}=require('./formRouter');



homeRouter.get('/', (req, res) => {
	//res.sendFile(path.join(rootdir, 'view', 'rename.html'));
	res.render('rename',{homes:detail});
	res.end();
});

module.exports=homeRouter;
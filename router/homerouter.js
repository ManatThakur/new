const express=require('express');
const storeControl=require('../controller/homeControl');
const hostController = require('../controller/hostController');
const homeRouter=express.Router();
const path = require('path');
const rootdir=require('../util/path');


homeRouter.get('/', storeControl.getHome);

homeRouter.get('/home/:id', storeControl.getDetails);
homeRouter.get('/favourites', storeControl.getFavourites);
homeRouter.post('/favourites', storeControl.postFavourites);
// host home route should use hostController
homeRouter.get('/hosthomes', hostController.getHostHome);

module.exports=homeRouter;
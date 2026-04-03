
const path = require('path');
// Import express
const express = require('express');
const bodyParser = require('body-parser');
const rootdir=require('./util/path');
// Create app
const app = express();
app.set('view engine','ejs');
app.set('views','view');
app.use(bodyParser.urlencoded({ extended: true }));
const server = require('http').createServer(app);

// Home route
app.use(express.static(path.join(rootdir,"public")));
const homeRouter=require('./router/homerouter');
const {router: formRouter}=require('./router/formRouter');
const buyRouter=require('./router/buyRouter');
app.use(homeRouter);
app.use(formRouter);
app.use(buyRouter);
app.post("/form",(req,res,next)=>{
  console.log("2nd route accessed",req.method,req.url,req.body);
 res.send(`Form submitted. Name: ${req.body.name}, Age: ${req.body.age}`);

});
app.use((req, res, next)=>{
  console.log(req.method, req.url, 'Not Found');
  res.status(404).send('Not Found');
});
// Server listening
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

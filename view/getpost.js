// Import express
const express = require('express');
const bodyParser = require('body-parser');
// Create app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const server = require('http').createServer(app);
// Middleware to parse JSON
app.get("/",(req, res, next)=>{
  console.log(req.method, req.url,req.body);
  next();
});
app.post("/first",(req,res,next)=>{
  console.log("Hello world route accessed",req.method,req.url,req.body);
  res.send('helo');
 
});
app.post("/form",(req,res,next)=>{
  console.log("2nd route accessed",req.method,req.url,req.body);
  res.send(`Form submitted. Name: ${req.body.name}, Age: ${req.body.age}`);
});

// Server listening
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

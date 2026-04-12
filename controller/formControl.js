const path = require('path');
const fs = require('fs');
const rootdir = require('../util/path');

const filePath = path.join(__dirname, '..', 'data', 'homes.json');

const detail = [];

exports.getaddForm = (req, res, next) => {
  res.render('form', { editing: false, title: 'Add Home' });
};

exports.postForm = (req, res, next) => {

  const newHome = {
    id: Date.now().toString(),   //
    homeName: req.body.homeName,
    address: req.body.address,
    price: req.body.price,
    rooms: req.body.rooms,
    image: req.body.image
  };

  // Read existing file
  fs.readFile(filePath, (err, data) => {
    let homes = [];

    if (!err && data.length > 0) {
      homes = JSON.parse(data);
    }

    homes.push(newHome);

    // Write updated data
    fs.writeFile(filePath, JSON.stringify(homes, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    });
  });

};
exports.posteditForm = (req, res, next) => {
  const id = req.body.id;
  const newHome = {
    id: id,   //
    homeName: req.body.homeName,
    address: req.body.address,
    price: req.body.price,
    rooms: req.body.rooms,
    image: req.body.image
  };
  fs.readFile(filePath, (err, data) => {
    let homes = [];
    if (!err && data.length > 0) {
      homes = JSON.parse(data);
    }
    const homeIndex = homes.findIndex(h => h.id.toString() === id);
    if (homeIndex === -1) {
      console.log("Home not found with ID:", id);
      return res.redirect('/hosthomes');
    }
    homes[homeIndex] = newHome;
    fs.writeFile(filePath, JSON.stringify(homes, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/hosthomes');
    });
  });
};
exports.postdeleteHome = (req, res, next) => {
  const id = req.body.id;
  fs.readFile(filePath, (err, data) => {
    let homes = [];
    if (!err && data.length > 0) {
      homes = JSON.parse(data);
    }
    const updatedHomes = homes.filter(h => h.id.toString() !== id);
    fs.writeFile(filePath, JSON.stringify(updatedHomes, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    });
  });
};
exports.detail = detail;
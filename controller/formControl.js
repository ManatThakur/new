const path = require('path');
const fs = require('fs');
const rootdir = require('../util/path');

const filePath = path.join(__dirname, '..', 'data', 'homes.json');

const detail = [];

exports.getaddForm = (req, res, next) => {
  res.sendFile(path.join(rootdir, 'view', 'form.html'), { title: 'Add Home' });
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

exports.detail = detail;
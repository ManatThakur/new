const rootdir=require('../util/path');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'homes.json');


exports.getHostHome = (req, res) => {

  fs.readFile(filePath, (err, data) => {
    let homes = [];

    if (!err && data.length > 0) {
      homes = JSON.parse(data);
    }

    res.render('hosthomes', { homes: homes });
  });

};
exports.geteditForm = (req, res, next) => {
  const homeId = req.params.id;
  const editing = req.query.editing === 'true';
  if (!editing) {
    console.log("Editing mode not enabled for home ID:", homeId);
    return res.redirect('/hosthomes');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("Error reading homes data:", err);
      return res.status(500).send("Error reading data");
    }

    let homes = [];
    if (data.length > 0) {
      homes = JSON.parse(data);
    }

    const home = homes.find(h => h.id.toString() === homeId);

    if (!home) {
      console.log("Home not found with ID:", homeId);
      return res.redirect('/hosthomes');
    }

    console.log("Editing home with ID:", homeId, editing, home);
    res.render('form', { home: home, editing: editing, title: 'Edit Home' });
  });
};

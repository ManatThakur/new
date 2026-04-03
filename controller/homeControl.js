

//const {detail}=require('../controller/formControl');

//exports.getHome=(req, res) => {
    //res.sendFile(path.join(rootdir, 'view', 'rename.html'));
 //   res.render('rename',{homes:detail});
   // res.end();

//}
const rootdir=require('../util/path');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'homes.json');
const favouritePath = path.join(__dirname, '..', 'data', 'favourite.json');

exports.getHome = (req, res) => {

  fs.readFile(filePath, (err, data) => {
    let homes = [];

    if (!err && data.length > 0) {
      homes = JSON.parse(data);
    }

    res.render('rename', { homes: homes });
  });

};
exports.getDetails = (req, res) => {
  const homeId = req.params.id;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }

    let homes = [];

    if (data.length > 0) {
      homes = JSON.parse(data);
    }

    const home = homes.find(h => h.id.toString() === homeId);

    if (!home) {
      return res.status(404).send("Home not found");
    }

    res.render('details1', { home : home});
  });
};
exports.getFavourites = (req, res) => {
  fs.readFile(favouritePath, (err, favData) => {
    let favouriteIds = [];
    
    if (!err && favData.length > 0) {
      favouriteIds = JSON.parse(favData);
      // Trim all IDs to ensure clean matching
      favouriteIds = favouriteIds.map(id => id.trim());
    }

    fs.readFile(filePath, (err, data) => {
      let homes = [];

      if (!err && data.length > 0) {
        homes = JSON.parse(data);
      }

      const favouriteHomes = homes.filter(home => favouriteIds.includes(home.id.toString()));

      res.render('favourite', { homes: favouriteHomes });
    });
  });
};

exports.postFavourites = (req, res) => {
  const homeId = req.body.homeId.trim();
  
  fs.readFile(favouritePath, (err, data) => {
    let favouriteIds = [];
    
    if (!err && data.length > 0) {
      favouriteIds = JSON.parse(data);
    }
    
    // Trim all existing IDs to clean up any spaces
    favouriteIds = favouriteIds.map(id => id.trim());
    
    if (!favouriteIds.includes(homeId)) {
      favouriteIds.push(homeId);
      
      fs.writeFile(favouritePath, JSON.stringify(favouriteIds), (err) => {
        if (err) {
          return res.status(500).send("Error saving favourite");
        }
        res.redirect('/favourites');
      });
    } else {
      res.redirect('/favourites');
    }
  });
};



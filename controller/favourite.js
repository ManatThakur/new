

const rootdir=require('../util/path');
const fs = require('fs');
const path = require('path');

const favouriteFilePath = path.join(__dirname, '..', 'data', 'favourite.json');

module.exports = class Favourite {
  static fetchAll(callback) {
    fs.readFile(favouriteFilePath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static addToFavourite(homeId, callback) {
    Favourite.fetchAll(favouriteIds => {
      favouriteIds.push(homeId);
      fs.writeFile(favouriteFilePath, JSON.stringify(favouriteIds), callback);
    });
  }
};

const path = require('path');
const rootdir=require('../util/path');
const {detail}=require('../controller/formControl')
exports.getBuyHome=(req, res) => {
 
res.sendFile(path.join(rootdir, 'view', 'buy.html'));
console.log("Buy details:", detail);

}
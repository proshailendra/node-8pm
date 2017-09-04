var mongoose = require('mongoose');
var strCon=process.env.MONGODB_URI;
const con = mongoose.connect(strCon);
module.exports = con;
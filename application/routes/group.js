var express       = require('express');
var router        = express.Router();
var Product       = require('../models/product');
var Variant       = require('../models/variant');
var Cart          = require('../models/cart');
var Department    = require('../models/department');
var fs            = require('fs');
var genRules      = require("../seed/generate-association-rules");

/////////////////////////////////////////////////////////////////////
// TODO
// Handles GET group request, refresh cart and association rules
//
/////////////////////////////////////////////////////////////////////

router.get('/', function(req, res, next)
{
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  var items = cart.generateArray();

  // add cart items to dataset.csv
  var newLine = "\r\n";
  var csv = "";

  for (var i = 0; i<items.length; i++) {
    csv += items[i].item._id + ",";
  }
  csv = csv.substring(0, csv.length - 1); //remove last comma
  csv += newLine;

  // https://stackoverflow.com/questions/40725959/how-to-append-new-row-in-exist-csv-file-in-nodejs-json2csv
  fs.appendFile('seed/dataset.csv', csv, function (err) {
    if (err){
      console.log("error");
      throw err;
    }
    console.log('New grouping was appended to csv');

    // rerun generate-association-rules.js
    genRules.generateRules();
  });

  // empty bag 
  req.session.cart = {};
  res.redirect('/shopping-bag');

});

module.exports = router;

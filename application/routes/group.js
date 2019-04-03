var express       = require('express');
var router        = express.Router();
var Product       = require('../models/product');
var Variant       = require('../models/variant');
var Cart          = require('../models/cart');
var Department    = require('../models/department');
var fs            = require('fs');
var genRules      = require("../seed/generate-association-rules");
var mongoose    = require('mongoose');

/////////////////////////////////////////////////////////////////////
// TODO
// Handles GET group request, refresh cart and association rules
//
/////////////////////////////////////////////////////////////////////

router.get('/', function(req, res, next)
{
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  var items = cart.generateArray();

// don't need one item groupings
  if(items.length > 1){
    var newLine = "\r\n";
    var csv = "";
    for (var i = 0; i<items.length; i++) {
      csv += items[i].item._id + ",";
    }
    csv = csv.substring(0, csv.length - 1); //remove last comma
    csv += newLine;

    // add cart items to dataset.csv
    // https://stackoverflow.com/questions/40725959/how-to-append-new-row-in-exist-csv-file-in-nodejs-json2csv
    fs.appendFile('seed/dataset.csv', csv, function (err) {
      if (err){
        console.log("error");
        throw err;
      }

      // rerun generate-association-rules.js
      mongoose.connect('mongodb://localhost/yardAndGarage', { useNewUrlParser: true, useCreateIndex: true, });

      genRules.generateRules(function(){
          mongoose.disconnect();
          // empty bag
          req.session.cart = new Cart({});
          res.render('shoppingBag', {items: null, reccItems: []});
      });
    });
  }
  else{
    req.session.cart = new Cart({});
    res.render("shoppingBag");
  }
});

module.exports = router;

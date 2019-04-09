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

router.get('/', ensureAuthenticated, function(req, res, next)
{
  console.log("in grouping");
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
      else{
        console.log('New grouping was appended to csv');

        genRules.generateRules(function(){console.log("GENERATERULES CALLBACK 11")})

        req.session.cart = new Cart({});
        res.render('shoppingBag', {items: [], reccItems: []})
        // var itemsArr = req.session.cart.generateArray();
        // res.render('shoppingBag', {items: itemsArr, reccItems: []})
      }
    });
  }
  else{
    req.session.cart = new Cart({});
    // var itemsArr = req.session.cart.generateArray();
    console.log("58");
    res.render('shoppingBag', {items: [], reccItems: []})
    // res.render('shoppingBag', {items: itemsArr, reccItems: []})
  }

});

//FIXME: This is entirely duplicated from index.js
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated())
  {
    Department.getAllDepartments(function(e, departments)
    {
      req.session.department = JSON.stringify(departments)
      return next();
    })
  }
  else{
    //req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
};

module.exports = router;

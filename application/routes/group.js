var express       = require('express');
var router        = express.Router();
var Product       = require('../models/product');
var Variant       = require('../models/variant');
var Cart          = require('../models/cart');
var Department    = require('../models/department');

/////////////////////////////////////////////////////////////////////
// TODO
// Handles GET(?) group request, refresh cart and association rules
//
/////////////////////////////////////////////////////////////////////

// WASNT FINDING ROUTE D': moved to index

router.get('/', function(req, res, next)
{
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  var items = cart.generateArray();
  console.log("in group request");

  // TODO
  // add cart items to dataset.csv

  // rerun generate-association-rules.js

  req.session.cart = {};
  res.redirect('/shopping-bag');

});

module.exports = router;

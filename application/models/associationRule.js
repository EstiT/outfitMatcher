// Object modelling for product. This model will represent in the database and
// we will read the all the information according to this model.
// You can think that this is a representation of the database and we are using that
// for saving, reading, updating information from the database.

var mongoose    = require('mongoose');

var ruleSchema  = mongoose.Schema({
    lhs: {
        type: String
    },
    rhs: {
        type: String
    },
    confidence:{
      type: Number
    }
});

var Rule = module.exports = mongoose.model('AssociationRules', ruleSchema);

// These are functions to get data from the database. You can even reach the information
// without calling this functions but I just want to show you how you can add some functions
// to your model file to get specific data.

module.exports.getAllRules = function(callback){
    Rule.find(callback)
}

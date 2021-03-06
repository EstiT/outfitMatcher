var AssociationRule     = require('../models/associationRule');
var fs                  =  require('fs');
var Apriori             = require('apriori');


function generateRules(callback){
  let algo = new Apriori.Algorithm(0.03, 0.3, false);
  fs.readFile('seed/dataset.csv', 'utf8', function (err, data) {
       if (err){
         throw err;
       }
       else{
         var transactions = ArrayUtils.readCSVToArray(data, ',');
         var analysisResult = algo.analyze(transactions).associationRules;

         // convert analysisResult to associationRule type
         var rules = [];
         for(var i = 0; i<analysisResult.length; i++){
           rules.push(new AssociationRule({lhs : analysisResult[i].lhs,
                                             rhs : analysisResult[i].rhs,
                                      confidence : analysisResult[i].confidence}));
         }

         deleteRules(function(){
           insertRules(callback, rules);
         });
       }
   });
}



function deleteRules(callback)
{
    AssociationRule.deleteMany({}, function(e, result)
    {
        if (e)
        {
            console.log("Failed on deleting rules from db\nError:".error, e.message.error + "\n")
        }
        else
        {
            console.log("Rules deleted".red)
            callback();
        }
    });
}

function insertRules(callback, rules)
{
    for (let i = 0; i < rules.length; i++){
        rules[i].save(function(e, r) {
            if (i === rules.length - 1){
                console.log("Rules inserted".green)
                callback();
            }
        });
    }
}


 var ArrayUtils = (function () {
     function ArrayUtils() {
     }
     ArrayUtils.readCSVToArray = function (inputString, delimiter) {
         delimiter = delimiter || ',';
         var regexp = new RegExp(("(\\" + delimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + delimiter + "\\r\\n]*))"), 'gi');

         var arrayOfRows = [[]];
         var matched;
         while (!!(matched = regexp.exec(inputString))) {
             var matchedDelimiter = matched[1];
             if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
                 arrayOfRows.push([]);
             }
             var matchedValue = matched[2] ? matched[2].replace(new RegExp('""', 'g'), '"') : matched[3];
             if (matchedValue.length > 0) {
                 arrayOfRows[arrayOfRows.length - 1].push(matchedValue);
             }
         }
         return arrayOfRows;
     };
     return ArrayUtils;
 })();


 module.exports.generateRules = generateRules;

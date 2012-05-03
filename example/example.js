var cube2csv = require('../lib/cube2csv');

var myhost = require('./myhost');

cube2csv.types(myhost, function(res) {
  console.log(res);
});
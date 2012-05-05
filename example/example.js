var cube2csv = require('../lib');

var myhost = require('./myhost');

cube2csv.types(myhost, function(res) {
  console.log(res);
});
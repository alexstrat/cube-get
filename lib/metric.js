var request = require('request'),
    url     = require('url');

/**
 * Request metrics from Cube considering the given expression and options.
 *   >> GET /1.0/metric/get?expression={expression}
 *                        &start={options.start}
 *                        &stop={options.stop}
 *                        &limit={options.limit}
 *                        &step={options.step}
 *
 * Callback will be called with the result converted to CSV as argument.
 *
 * Options supported are :
 *    - host  {String}
 *    - start {String | Number}
 *    - stop  {String | Number}
 *    - limit {Number}
 *    - step  {1e4|6e4|3e5|36e5|864e5}
 *
 * @param  {[type]}   expression [description]
 * @param  {[type]}   options    [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
module.exports = function(expression, options, cb) {

};
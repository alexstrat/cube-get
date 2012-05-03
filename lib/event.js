var request = require('request'),
    url     = require('url');

/**
 * Request events from Cube considering the given expression and options.
 *   >> GET /1.0/event/get?expression={expression}
 *                        &start={options.start}
 *                        &stop={options.stop}
 *                        &limit={options.limit}
 *
 * Callback will be called with the result converted to CSV as argument.
 *
 * Options supported are :
 *    - host  {String}
 *    - start {String | Number}
 *    - stop  {String | Number}
 *    - limit {Number}
 *
 * @param  {String}   expression     [description]
 * @param  {Object}   options        [description]
 * @param  {Function} cb             callback to be executed when request completed.
 */
module.exports = function(expression, options, cb) {
};
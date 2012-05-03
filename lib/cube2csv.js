var request = require('request'),
    url     = require('url');

/**
 * Request known event types from Cube.
 *   >> GET /1.0/types/get
 *
 * Callback will be called with events' name in an Array.
 *
 * @param  {String}   [host=localhost:1081] - evaluator host-name
 * @param  {Function} cb   - callback to be executed when request completed.
 */
exports.types = function(host, cb) {
  if(typeof host === 'function') {
    cb = host;
    host = 'localhost:1081';
  }

  var query = buildTypesQuery(host);

  request.get(query, function(err, res, body) {
    if(err)
      cb(err);
    else
      try {
        cb(JSON.parse(body));
      } catch(e) {
        cb(e);
      }
  });
};

/**
 * Build the query endpoint for fetching types.
 *
 * @param  {String} host - host to query
 * @return {String} generated query
 */
var buildTypesQuery = exports.buildTypesQuery = function(host) {
  return url.format({
    protocol : 'http',
    host : host,
    pathname : '1.0/types/get'
  });
};

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
exports.event = function(expression, options, cb) {

};


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
exports.metric = function(expression, options, cb) {

};
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

module.exports = function(host, cb) {
  
  var query = buildQuery(host);

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

var buildQuery = function(host) {
  return url.format({
    protocol : 'http',
    host : host,
    pathname : '1.0/types/get'
  });
};

module.exports.buildQuery = buildQuery;
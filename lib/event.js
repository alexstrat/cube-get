var request = require('request'),
    url     = require('url'),
    rdv     = require('rendezvous'),
    tocsv   = require('./tocsv');

/**
 * Request events from Cube considering the given expression and options.
 *   >> GET /1.0/event/get?expression={expression}
 *                        &start={options.start}
 *                        &stop={options.stop}
 *                        &limit={options.limit}
 *
 * Callback will be called with the result converted to format as argument.
 *
 *
 * @param  {String}        expression        - cube event expression
 * @param  {Object}        options
 *         {String}        options.host      - evaluator host-name
 *         {String|Date}   options.[start]   - start date for events, can be a `rendezvous`
 *                                             expression
 *         {String|Date}   options.[stop]    - stop date for events, can be a `rendezvous`
 *                                             expression
 *         {String|Number} options.[limit]   - maximum number of event to fetch. Can be a
 *                                             `rendezvous.duration` expression if start or
 *                                             stop not defined : the missing option will be
 *                                             deduced.
 *         {String}        options.[format]  - `json`or `csv`. If not supplied json-parsed data
 *         {Boolean}       options.[inverse] - inverse date format in csv : mm/dd/yy to dd/mm/yy
 *
 * @param  {Function}      cb                - callback to be executed when request completed
 */
module.exports = function(expression, options, cb) {
  var query = buildQuery(expression, options);

  request.get(query, function(err, res, body) {
    if(err)
      cb(err);
    else if(res.statusCode !== 200)
      cb(new Error(body));
    else {
      var parsed;
      switch(options.format) {
        case 'json':
          cb(body);
          break;
        case 'csv':
          parsed = JSON.parse(body).map(function(val){
            val.time = new Date(val.time);
            return val;
          });
          cb(tocsv(parsed, options.inverse));
          break;
        default :
          parsed = JSON.parse(body).map(function(val){
            val.time = new Date(val.time);
            return val;
          });
          cb(parsed);
          break;
      }
    }
  });

};


/**
 * Build query for fetching events.
 * @param  {String} expression - cube event expression
 * @param  {Object} options    - @see options of #event
 * @return {String} generated query
 */
var buildQuery = function(expression, options) {
  var start;
  if(options.start) {
    start = (options.start instanceof Date) ? options.start : rdv(options.start);
    if(start === false)
      throw new Error(options.start + ': invalid rendezvous expression');
  }

  var stop;
  if(options.stop) {
    stop = (options.stop instanceof Date) ? options.stop : rdv(options.stop);
    if(stop === false)
      throw new Error(options.stop + ': invalid rendezvous expression');
  }

  var limit;
  if(options.limit) {
    if(typeof options.limit === 'string' && (!start || !stop)) {
      var duration = rdv.duration(options.limit);
      if(duration === false)
        throw new Error(options.limit + ': invalid rendezvous duration expression');

      if(!start && stop ) start = new Date(stop -duration);
      if(!stop  && start) stop  = new Date(start+duration);
    }
    else limit = options.limit;
  }

  var query = {};
  query.expression = expression;
  if(start) query.start = start.toISOString();
  if(stop)  query.stop  = stop.toISOString();
  if(limit) query.limit = limit;

  return url.format({
    protocol : 'http',
    host : options.host,
    pathname : '1.0/event/get',
    query : query
  });
};

module.exports.buildQuery = buildQuery;
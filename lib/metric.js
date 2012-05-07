var request = require('request'),
    url     = require('url'),
    rdv     = require('rendezvous'),
    tocsv   = require('./tocsv');

/**
 * Request metrics from Cube considering the given expression and options.
 *   >> GET /1.0/metric/get?expression={expression}
 *                        &start={options.start}
 *                        &stop={options.stop}
 *                        &limit={options.limit}
 *                        &step={options.step}
 *
 * Callback will be called with the result converted to format as argument.
 *
 *
 * @param  {String}        expression        - cube metric expression
 * @param  {Object}        options
 *         {String}        options.host      - evaluator host-name
 *         {String|Date}   options.[start]   - start date for metrics, can be a `rendezvous`
 *                                             expression
 *         {String|Date}   options.[stop]    - stop date for metrics, can be a `rendezvous`
 *                                             expression
 *         {String}        options.[over]    - a `rendezvous.duration` expression. Time window
 *                                             over which the event will be fetched. The missing
 *                                             start or stop option will be deduced from this'
 *         {String|Number} options.[limit]   - maximum number of metric to fetch. Can be a
 *                                             `rendezvous.duration` expression : the numeric
 *                                             value will be deduced according to step
 *         {String}        options.step      - metric reolution exprimed as number or as
 *                                             `rendezvous.duration\'. As reminder, Cube supports
 *                                             5 resolutions : 10s, 1m, 5m, 1h and 1d.
 *         {String}        options.[format]  - `json` or `csv`. If not supplied json-parsed data
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

/*
 * Build query for fetching metrics.
 * @param  {String} expression - cube metric expression
 * @param  {Object} options    - @see options of #metric
 * @return {String} generated query
 */
var buildQuery = function(expression, options) {
  var step = (typeof options.step === 'string') ? rdv.duration(options.step) : options.step;
  if(step === false)
    throw new Error(options.step + ': invalid rendezvous duration expression');
  if([1e4, 6e4, 3e5, 36e5, 864e5].indexOf(step) === -1)
    throw new Error(options.step+' is not a supported resolution');

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

  if(options.over) {
    var over = rdv.duration(options.over);
    if(over === false)
      throw new Error(options.over + ': invalid rendezvous duration expression');

    if(!start && stop ) start = new Date( stop.valueOf() -over);
    if(!stop  && start) stop  = new Date(start.valueOf() +over);
  }
  
  var limit;
  if(options.limit) {
    if(typeof options.limit === 'string') {
      var duration = rdv.duration(options.limit);
      if(duration === false)
        throw new Error(options.limit + ': invalid rendezvous duration expression');

      limit = Math.floor(duration/step);
    }
    else limit = options.limit;
  }

  var query = {};
  query.expression = expression;
  query.step = step;
  if(start) query.start = start.toISOString();
  if(stop)  query.stop  = stop.toISOString();
  if(limit) query.limit = limit;

  return url.format({
    protocol : 'http',
    host : options.host,
    pathname : '1.0/metric/get',
    query : query
  });
};

module.exports.buildQuery = buildQuery;
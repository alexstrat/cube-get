var reg = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?(?:(\d+)ms)?$/i;

/**
 * Parse a duration expression and return it in ms.
 * 
 * '1ms'      ->          1
 * '1s'       ->      1,000
 * '1s30ms'   ->      1,030
 * '1m30s'    ->      6,300
 * '1h'       ->   3600,000
 * '1d'       -> 86,400,000
 * 
 * @param {String} expression - duration expression to parse
 * @return {Number | Boolean} duration in ms, false if parse failed
 */

module.exports = function(expression) {
  var res = reg.exec(expression);

  if(res !== null) {
    res = res.map(function(s) {
     return (typeof s === 'undefined')? 0 : Number(s);
    });

    return (res[1])*1000*60*60*24 +
           (res[2])*1000*60*60    +
           (res[3])*1000*60       +
           (res[4])*1000          +
           (res[5]);
  } else 
    return false;
};
var reg = /^(?:(\d+))?(?::(\d+))?(?::(\d+))?(?::(\d+))?(?::(\d+))?$/i;
/**
 * Convert a time expression to a number of millisecond.
 * 
 * For instance :
 * '12:00'
 * '12:50:4'
 * '12:05:8:300'
 * '36:00' -> false
 * 
 * @param  {String} expression - expression to parse
 * @return {Number || Boolean} number of milliseconds or false if fails         
 */
module.exports = function(expression) {
  var res = reg.exec(expression);
  if(res!==null) {
    res.shift();
    res = res.map(function(s) {
     return (typeof s === 'undefined')? 0 : Number(s);
    });

    if(res[0]>23 || res[1]>59 || res[2]>59 || res[3]>1000)
      return false;

    return (res[0])*1000*60*60    +
           (res[1])*1000*60       +
           (res[2])*1000          +
           (res[3]);
  } else
    return false;
};
require('date-utils');

/**
 * Parse a date expression amongs these ones supported :
 *   '3/3/12 12:45'
 *   '3/3/12@12:45:05'
 *   'now'
 *   'today'
 *   'today@12:45'
 *   'today-3d'
 *   'now-3h40m'
 *   'today-3d@12:45'
 *   
 * Warning : if you use relative dates, don't write the absolute
 * dates with - or +.
 * Example : '2012-3-4-4d' makes no sense for us..
 * 
 * Return a valid Date instance
 * 
 * @param  {String} expression - expression to parse
 * @return {Date | Boolean}   computed value instance or false if fail
 */
module.exports = function(expression) {
  var date = new Date(expression);

  //valid date
  if(!isNaN(date.valueOf()))
    return date;
  else {

  }
};

//try to match '3+3', 'now-4'..
var reg = /^(.*)([\+\-])(.*)$/i;

/**
 * Try to parse the date part of the full date.
 * For instance :
 *   'today-3d'
 * 
 * @param  {String} expression - date expression to parse.
 * @return {Number | boolean}   result in UNIX time or false if fail.
 */
var parseDate = function(expression) {
  var date = Date.parse(expression);
  if(!isNaN(date))
    return date;

  if(expression === 'today')
    return Date.today().valueOf();

  if(expression === 'yesterday')
    return Date.yesterday().valueOf();

  var res = reg.exec(expression);
  if(res !== null) {
    var left = parseDate(res[1]);
    var right = parseDate(res[3]);
    if((left!==false)&&(right!==false))
      return (res[2] === '+')? left+right : left-right;
    }

  else
    return false;
};

/**
 * [parseTime description]
 * @param  {[type]} expression [description]
 * @return {[type]}            [description]
 */
var parseTime = function(expression) {

};
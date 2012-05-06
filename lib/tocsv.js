module.exports = function(arr, inverse) {
  return arr.map(function(row) {
    var ret = [];
    ret.push(row.time.toFormat((inverse) ? 'DD/MM/YYYY HH24:MI:SS' : 'MM/DD/YYYY HH24:MI:SS'));
    for(var key in row.data || {}) {
      ret.push(row.data[key].toString());
    }
    return ret.join(';');
  }).join('\n');
};
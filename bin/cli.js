#!/usr/bin/env node

get = require('../lib/index');

var argv = require('optimist')
        .usage('Usage: $0 [\'metric\', \'event\', \'types\'] [expression] {OPTIONS}')
        .wrap(80)
        .option('expression', {
          alias  : 'e',
          desc   : 'Expression to be evaluated by Cube evaluator'
        })
        .option('start', {
          alias  : 's',
          desc   : 'Start date of fetching. Can be a \'rendezvous\' expression'
        })
        .option('stop', {
          alias  : 'S',
          desc   : 'Stop date of fetching. Can be a \'rendezvous\' expression'
        })
        .option('over', {
          alias  : 'o',
          desc   : 'A \'rendezvous.duration\' expression. Time window over wich the event'+
                   ' or metric will be fetched. The missing start or stop option will be '+
                   'deduced from this'
        })
        .option('limit', {
          alias  : 'l',
          desc   : 'Maximum number of value to fetch. Can be a \'rendezvous.duration\' '+
                   'expression, the numeric value will be deduced from \'step\''
        })
        .option('step', {
          alias  : 't',
          desc   : 'Metric resolution exprimed as number or as \'rendezvous.duration\'. As '+
                   'reminder, Cube supports 5 resolutions : 10s, 1m, 5m, 1h and 1d',
          default : '10s'
        })
        .option('format', {
          alias  : 'f',
          desc   : 'Output format : pure json or csv',
          default: 'csv'
        })
        .option('json', {
          desc   : 'Shortcut for output format in pure json',
          boolean: true,
          default: false
        })
        .option('inverse', {
          alias  : 'i',
          desc   : 'Inverse date format in csv : mm/dd/yy to dd/mm/yy',
          boolean: true,
          default: false
        })
        .option('host', {
          alias  : 'H',
          desc   : 'Cube evaluator host',
          default: 'localhost:1081'
        })
        .option('request', {
          alias  : 'r',
          desc   : 'Only ouput the computed request without executing it',
          default: false,
          boolean: true
        })
        .option('help', {
          alias  : 'h',
          desc   : 'Display this message'
        })
        .check(function(argv) {
          if(argv.help) throw '';
          if(['types', 'metric', 'event'].indexOf(argv._[0] ) === -1)
            throw 'Specify \'types\', \'metric\' or \'event\'' ;
          if(argv._[1])
            argv.expression = argv._[1];
          if(argv.json)
            argv.format = 'json';
        })
        .argv;

switch(argv._[0]) {
  case 'types':
    if(argv.request)
      console.log(get.types.buildQuery(argv.host));
    else
      get.types(argv.host, function(arr) {
        return arr instanceof Error ? console.error(arr): console.log(arr.join('\n'));
      });
    break;

  case 'event':
    if(argv.request)
      console.log(get.event.buildQuery(argv.expression, argv).replace(/%3A/g, ':'));
    else
      get.event(argv.expression, argv, function(arr) {
        return arr instanceof Error ? console.error(arr): console.log(arr);
      });
      break;

  case 'metric':
    if(argv.request)
      console.log(get.metric.buildQuery(argv.expression, argv).replace(/%3A/g, ':'));
    else
      get.metric(argv.expression, argv, function(arr) {
        return arr instanceof Error ? console.error(arr): console.log(arr);
      });
    break;
}
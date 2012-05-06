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
        .option('limit', {
          alias  : 'l',
          desc   : 'Maximum number of value to fetch. Can be a \'rendezvous.duration\' '+
                   'expression, if start or stop not defined : the missing option, or '+
                   'limit, will be deduced'
        })
        .option('format', {
          alias  : 'f',
          desc   : 'Output format : pure json or csv',
          default: 'csv'
        })
        .option('inverse', {
          alias  : 'i',
          desc   : 'inverse date format in csv : mm/dd/yy to dd/mm/yy',
          boolean: true,
          default: false
        })
        .option('host', {
          alias  : 'H',
          desc   : 'Cube evaluator host',
          default: 'localhost:8081'
        })
        .option('request', {
          alias  : 'r',
          desc   : 'Only ouput the computed request without execute it',
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
        })
        .argv;

switch(argv._[0]) {
  case 'types':
    if(argv.request)
      console.log(get.types.buildQuery(argv.host));
    else
      get.types(argv.host, function(arr) {
        console.log(arr instanceof Error ? arr: arr.join('\n'));
      });
    break;

  case 'event':
    if(argv.request)
      console.log(get.event.buildQuery(argv.expression, argv).replace(/%3A/g, ':'));
    else
      get.event(argv.expression, argv, function(arr) {
        console.log(arr instanceof Error ? arr: arr);
      });
      break;

  case 'metric':
    break;
}
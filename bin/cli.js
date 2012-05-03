#!/usr/bin/env node

cube2csv = require('../lib/index');

var argv = require('optimist')
        .usage('Usage: $0 [metric, event, types] {OPTIONS}')
        .wrap(80)
        .option('expression', {
          alias : 'e',
          desc : 'Expression to be evaluated by Cube'
        })
        .option('host', {
          alias : 'H',
          desc : 'Cube evaluator host',
          default: 'localhost:8081'
        })
        .option('request', {
          alias : 'r',
          desc : 'Ouput only the computed query',
          default : false,
          boolean : true
        })
        .option('help', {
          alias : 'h',
          desc : 'Display this message'
        })
        .check(function(argv) {
          if(argv.help) throw '';
          if(['types', 'metric', 'event'].indexOf(argv._[0] ) === -1)
            throw 'Specify \'types\', \'metric\' or \'event\'' ;
        })
        .argv;

switch(argv._[0]) {
  case 'types':
    if(argv.request)
      console.log(cube2csv.types.buildQuery(argv.host));
    else
      cube2csv.types(argv.host, console.log);
    break;

  case 'event':
    break;

  case 'metric':
    break;
}
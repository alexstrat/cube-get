[![build status](https://secure.travis-ci.org/alexstrat/cube-get.png)](http://travis-ci.org/alexstrat/cube-get)
Utility command-line tool to rapidly and easily fetch data from [square/cube](http://square.github.com/cube) evaluator.

Leverages [rendezvous](https://github.com/alexstrat/node-rendezvous) expressions to rapidly select what data in the time you need.

Command line output is by default exported as CSV format but you can use programaticaly the API.

#### Installation

```bash
$ npm install -g cube-get
```

### Examples

Get the IPs in `cube_request` done today at 9:30 in the morning over 30 minutes :

```bash
$ cube-get event 'cube_request(ip)' --start today@9:30 --over 30m
```

Get the number of requests of last week's week-end (7 days before) starting at 7:30 for each hours :

```bash
$ cube-get metric 'sum(cube_request)' --start today-7d@7:30 --over 2d --step 1h
```

Get types :

```bash
$ cube-get types
```

And so on...

### Synopsis

```
Usage: cube-get ['metric', 'event', 'types'] [expression] {OPTIONS}

Options:

  --expression, -e  Expression to be evaluated by Cube evaluator 

  --start, -s       Start date of fetching. Can be a 'rendezvous' expression 

  --stop, -S        Stop date of fetching. Can be a 'rendezvous' expression  

  --over, -o        A 'rendezvous.duration' expression. Time window over wich
                    the event or metric will be fetched. The missing start or
                    stop option will be deduced from this      

  --limit, -l       Maximum number of value to fetch. Can be a
                    'rendezvous.duration' expression, the numeric value will be
                    deduced from 'step'             

  --step, -t        Metric resolution exprimed as number or as
                    'rendezvous.duration'. As reminder, Cube supports 5
                    resolutions : 10s, 1m, 5m, 1h and 1d        [default: "10s"]

  --format, -f      Output format : pure json or csv            [default: "csv"]

  --json            Shortcut for output format in pure json
                                                     [boolean]  [default: false]

  --inverse, -i     Inverse date format in csv : mm/dd/yy to dd/mm/yy
                                                     [boolean]  [default: false]

  --host, -H        Cube evaluator host              [default: "localhost:1081"]

  --request, -r     Only ouput the computed request without executing it
                                                     [boolean]  [default: false]

  --help, -h        Display this message                                      
```

### Warning

Be carefull to corectly escape your expressions..
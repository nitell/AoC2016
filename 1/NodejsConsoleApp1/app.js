'use strict';
var http = require('http');
var request = http.request({'path': 'http://ptfs.partner.master.int:8080/tfs/Simulation/_apis/tfvc/changesets?api-version=1.0&top=500',
                            'auth': 'partner\\xmikaeln:Mikael8896'
                           }, 
                           function (response) {
                             console.log('STATUS: ' + response.statusCode);
                             console.log('HEADERS: ' + JSON.stringify(response.headers));
                             response.setEncoding('utf8');
                             response.on('data', function (chunk) {
                               console.log('BODY: ' + chunk);
                             });
                           });
request.end();




'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var sum = 0;
array.forEach(s => {
    var expr = /(.)(.)\2\1/;    
    if (expr.exec(s) == null)
        return;
    var expr2 = /\[.*(.)(.)\2\1.*\]/;
    if (expr2.exec(s) == null)
        return;
    sum = sum +1;
       
});
console.log(sum);




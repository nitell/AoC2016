'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var i = 0;
var j = 0;

array.forEach(s => {
    var a = parseInt(s.substr(0, 5));
    var b = parseInt(s.substr(5, 5));
    var c = parseInt(s.substr(10, 5));
    if (a + b > c &&
        a + c > b &&
        b + c > a) {
        i++;
    } else {
        console.log('no....');
    }
    j++;
});

console.log(i);
console.log(j);




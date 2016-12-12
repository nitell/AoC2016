'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");
var str = array.join('').split('');
var result = '';
function read(next) {
    var c = next();
    if (c == null)
        return;
    if (c == '(') {
        readMark(next);
    }
    else {
        result = result + c;
        read(next);
    }
}

function readMark(next) {
    var mark = '';
    var c = next();
    while (c != null && c != ')') {
        mark = mark + c;
        c = next();
    }
    var match = /(.+)x(.+)/.exec(mark);

    var block = '';
    for (var q=0;q<match[1];q++)
        block = block + next();

    for (var k=0;k<match[2];k++)
        result = result + block;     
    read(next);
}


var i = 0;
function next() {
    if (i < str.length) {
        var c = str[i];
        i++;
        return c;
    }
    return null;
}
read(function () { return str[i++] });
console.log(result.length);
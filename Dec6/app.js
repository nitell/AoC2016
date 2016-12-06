'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var sum = 0;

var results = [{}, {}, {}, {}, {},{},{},{}]
array.forEach(s => {
    for (var i = 0; i < results.length; i++) {
        var c = s.split('')[i];
        var dictionary = results[i];
        if (typeof dictionary[c] === "undefined")
            dictionary[c] = 1;
        else
            dictionary[c] = dictionary[c] + 1;
    }
});


var result = "";
results.forEach(r => {
    var items = [];
    for (var key in r) {
        items.push({ c: key, v: r[key] });
    }
    var sortedLetters = items.sort((a, b) => a.v > (b.v) ? -1 : 1);
    result = result + sortedLetters[0].c;

})

console.log(result);




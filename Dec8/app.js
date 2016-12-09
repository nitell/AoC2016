'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var display = new Array(3);
for (var i = 0; i < 6; i++) {
    display[i] = new Array(50);
    for (var c = 0; c < display[i].length; c++) {
        display[i][c] = '.';
    }
}

array.forEach(s => {
    cmd(s, /rect (.+)x(.+)/, function (match) {
        if (match != null) {
            for (var column = 0; column < parseInt(match[1]); column++) {
                for (var row = 0; row < parseInt(match[2]); row++) {
                    display[row][column] = '#';
                }
            }
        }
    });

    cmd(s, /rotate column x=(.+) by (.+)/, function (match) {
        var column = display.map(r => r[match[1]]);
        var scrolledOut = column.slice(column.length - match[2]);
        var result = scrolledOut.concat(column.slice(0, column.length - scrolledOut.length));
        for (var r = 0; r < result.length; r++) {
            display[r][match[1]] = result[r]
        }
    });

      cmd(s, /rotate row y=(.+) by (.+)/, function (match) {
        var row = display[match[1]];
        var scrolledOut = row.slice(row.length - match[2]);
        var result = scrolledOut.concat(row.slice(0, row.length - scrolledOut.length));
        display[match[1]] = result;
        });
});

function cmd(input, pattern, onMatch) {
    var match = pattern.exec(input);
    if (match != null)
        onMatch(match);
}



for (var row = 0; row < display.length; row++) {
    console.log(display[row].join(''));
}

var sum=0;
for (var row = 0; row < display.length; row++) {
    for (var column = 0; column < display[row].length; column++) {
        if (display[row][column] == "#") {
            sum = sum +1;
        }
    }

}
console.log(sum);




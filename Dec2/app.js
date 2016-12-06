'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var pos = { x: 1, y: 1 };


array.forEach(s => {
    for (var x = 0; x < s.length; x++) {
        switch (s[x]) {
            case 'U':
                pos.y = pos.y === 0 ? 0 : pos.y - 1;
                break;
            case 'D':
                pos.y = pos.y === 2 ? 2 : pos.y + 1;
                break;
            case 'L':
                pos.x = pos.x === 0 ? 0 : pos.x - 1;
                break;
            case 'R':
                pos.x = pos.x === 2 ? 2 : pos.x + 1;
                break;
        }
    }
    console.log((pos.y) * 3 + pos.x+1);
});




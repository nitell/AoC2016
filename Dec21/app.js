'use strict';
var fs = require('fs');

function Command(regex, cmd) {
    this.regex = regex;
    this.exec = cmd;
}

var commands = [
    new Command(/swap position (.+) with position (.+)/, (match, arr) => {
        var saved = arr[match[1]];
        arr[match[1]] = arr[match[2]];
        arr[match[2]] = saved;
        return arr;
    }
    ),
    new Command(/swap letter (.) with letter (.)/, (match, arr) => {
        var index1 = arr.indexOf(match[1]);
        var index2 = arr.indexOf(match[2]);
        var saved = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = saved;
        return arr;
    }),
    new Command(/reverse positions (.+) through (.+)/, (match, arr) => {
        var start = arr.slice(0, match[1]);
        var end = arr.slice(parseInt(match[2]) + 1);
        var middle = arr.slice(match[1], parseInt(match[2]) + 1);
        return start.concat(middle.reverse()).concat(end);
    }),
    new Command(/rotate left (.+) step/, (match, arr) => {
        var result = arr;
        for (var i = 0; i < parseInt(match[1]); i++) {
            result = result.slice(1).concat([result[0]]);
        }   
        return result;     
    }),
    new Command(/rotate right (.+) step/, (match, arr) => {
        var result = arr;
        for (var i = 0; i < parseInt(match[1]); i++) {
            result = [result[result.length -1]].concat(result.slice(0,result.length-1));
        }
        return result;
    }),
    new Command(/move position (.+) to position (.+)/, (match, arr) => {
        var letter = arr[match[1]];
        var withoutLetter = arr.slice(0, match[1]).concat(arr.slice(parseInt(match[1]) + 1));
        return withoutLetter.slice(0, match[2]).concat([letter]).concat(withoutLetter.slice(parseInt(match[2])));
    }),
    new Command(/rotate based on position of letter (.+)/, (match, arr) => {
        var result = arr;
        var rotations = arr.indexOf(match[1]);
        if (rotations >= 4)
            rotations = rotations + 1;
        rotations = rotations + 1;
         for (var i = 0; i < rotations; i++) {
            result = [result[result.length -1]].concat(result.slice(0,result.length-1));
        }
        return result;
    })
];



var password = 'abcdefgh'.split('');
console.log(password.join(''));
var array = fs.readFileSync('input.txt').toString().split("\n");
array.forEach(r => {
    console.log(r);
    commands.forEach(c => {
        var match = c.regex.exec(r);
        if (match)
            password = c.exec(match, password);
    });
    console.log(password.join(''));
});











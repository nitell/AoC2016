'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");
var ip = 0;
var registers = { a: 0, b: 0, c: 0, d: 0 };

function getValue(s)
{
    var i = parseInt(s);
    if (isNaN(i))
        return registers[s];
        return i;
}

while (ip < array.length) {
    var instruction = array[ip];

    var copyMatch = /cpy (.+) (.)/.exec(instruction);
    if (copyMatch != null) {
        registers[copyMatch[2]] = getValue(copyMatch[1]);        
    }

    var incMatch = /inc (.)/.exec(instruction);
    if (incMatch != null) {
        registers[incMatch[1]] = getValue(incMatch[1]) + 1;        
    }

    var decMatch = /dec (.)/.exec(instruction);
    if (decMatch != null) {
        registers[decMatch[1]] = getValue(decMatch[1]) - 1;        
    }

    var jnzMatch = /jnz (.+) (.+)/.exec(instruction);
    if (jnzMatch != null) {
        if (getValue(jnzMatch[1]) != 0) {
            ip = ip + getValue(jnzMatch[2])-1;
        }
    }
    ip++;

}

console.log(registers);




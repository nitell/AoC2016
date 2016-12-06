'use strict';
var input = 'R1, L3, R5, R5, R5, L4, R5, R1, R2, L1, L1, R5, R1, L3, L5, L2, R4, L1, R4, R5, L3, R5, L1, R3, L5, R1, L2, R1, L5, L1, R1, R4, R1, L1, L3, R3, R5, L3, R4, L4, R5, L5, L1, L2, R4, R3, R3, L185, R3, R4, L5, L4, R48, R1, R2, L1, R1, L4, L4, R77, R5, L2, R192, R2, R5, L4, L5, L3, R2, L4, R1, L5, R5, R4, R1, R2, L3, R4, R4, L2, L4, L3, R5, R4, L2, L1, L3, R1, R5, R5, R2, L5, L2, L3, L4, R2, R1, L4, L1, R1, R5, R3, R3, R4, L1, L4, R1, L2, R3, L3, L2, L1, L2, L2, L1, L2, R3, R1, L4, R1, L1, L4, R1, L2, L5, R3, L5, L2, L2, L3, R1, L4, R1, R1, R2, L1, L4, L4, R2, R2, R2, R2, R5, R1, L1, L4, L5, R2, R4, L3, L5, R2, R3, L4, L1, R2, R3, R5, L2, L3, R3, R1, R3';

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

var commands = input.split(', ');
var directions = ['N', 'E', 'S', 'W'];
var directionPos = 0;
var pos = { x: 0, y: 0 };


commands.forEach(function (cmd) {
    var turn = cmd[0];
    var length = parseInt(cmd.substring(1));
    directionPos = (turn == 'R' ? directionPos + 1 : directionPos - 1).mod(4);
    pos = go(directions[directionPos], length, pos);
});
console.log(Math.abs(pos.x) + Math.abs(pos.y));


function go(heading, length, pos) {
    switch (heading) {
        case 'N':
            return { x: pos.x, y: pos.y + length };
        case 'S':
            return { x: pos.x, y: pos.y - length };
        case 'E':
            return { x: pos.x + length, y: pos.y };
        case 'W':
            return { x: pos.x - length, y: pos.y };
    }
}



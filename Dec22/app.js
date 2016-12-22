'use strict';
var fs = require('fs');

function Node(x, y, size, used) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.size = parseInt(size);
    this.used = parseInt(used);
    this.free = this.size - this.used;
}




var array = fs.readFileSync('input.txt').toString().split("\n");
var nodes = [];
array.forEach(r => {
    var match = /x([0-9]+)-y([0-9]+)( \s+)([0-9]+)T( \s+)([0-9]+)T/.exec(r);
    var node = new Node(match[1], match[2], match[4], match[6]);
    nodes.push(node);
});

var result = 0;
for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
        if (i != j && nodes[i].used > 0 && nodes[i].used < nodes[j].free)
            result++;
    }
}

console.log(result);












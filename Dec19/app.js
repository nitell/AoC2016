'use strict';
function findLastElf(elf) {
    var current = elf;
    while (current.next != current) {
        current.next = current.next.next;
        current = current.next;
    }
    return current;
}

function createElves(count) {
    var firstElf = { index: 1 };

    var current = firstElf;
    for (var i = 2; i <= count; i++) {
        var newElf = { index: i }
        current.next = newElf;
        if (i == count) {
            newElf.next = firstElf;
        }
        current = newElf;
    }
    return firstElf;
}

var elves = createElves(3004953);
var lastElf = findLastElf(elves);
console.log(lastElf.index);





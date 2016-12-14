'use strict';


function findTriplets(hash) {
    var result = [];
    var match;
    var regex = /(.)\1\1/g;
    while (match = regex.exec(hash)) {
        result.push(match[1]);
    }
    return result;
}

function findFivelets(hash) {
    var result = [];
    var match;
    var regex = /(.)\1\1\1\1/g;
    while (match = regex.exec(hash)) {
        result.push(match[1]);
    }
    return result;
}


var md5 = require('js-md5');
var input = 'qzyelonm';

function getHash(i) {
    if (!hashes[i])
        hashes[i] = md5(input + i);
    return hashes[i];
}

var hashes = {}
var answers = [];
function foo() {
    var keyIndex = 0;
    while (answers.length < 64) {
        var hash = getHash(keyIndex);
        var triplet = /(.)\1\1/.exec(hash);
        if (triplet) {
            var fiveKindIndex = findFiveKind(triplet[1], keyIndex)
            if (fiveKindIndex != -1)
                answers.push({triplet: keyIndex, fivelet: fiveKindIndex });
        }
        keyIndex++;
    }
    return answers;
}

function findFiveKind(s, index) {
    var searchStr = Array(6).join(s);
    for(var i=1;i <=1000;i++) {
        if (getHash(index+i).indexOf(searchStr) != -1)
            return index+i;
    }
    return -1;
}

var result = foo();
for (var i=0;i<result.length;i++)
    console.log(i + ' '+ result[i].triplet+ ' ' + result[i].fivelet);
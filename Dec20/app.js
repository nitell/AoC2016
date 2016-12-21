'use strict';
var fs = require('fs');

function Interval(s, e) {
    this.start = s;
    this.end = e;
}

function getSortedIntervals() {

    var array = fs.readFileSync('input.txt').toString().split("\n");
    var segments = array.map(i => {
        var split = i.split('-');
        return { start: parseInt(split[0]), end: parseInt(split[1]) };
    });

    segments.sort((a, b) => a.start > b.start ? 1 : -1);
    return segments;
}

function merge(intervals) {
    var result = [];
    var prev = intervals[0];
    for (var i = 1; i < intervals.length; i++) {
        var curr = intervals[i];
        if (prev.end >= curr.start) {
            // merged case
            var merged = new Interval (prev.start, Math.max(prev.end, curr.end));
            prev = merged;
        } else {
            result.push(prev);
            prev = curr;
        }
    }

    result.push(prev);

    return result;
}

function findSmallest(m) {
    for (var i = 0; i < m.length - 1; i++) {
        if (m[i].end < m[i + 1].start - 1)
            return m[i].end + 1;
    }
    return -1;
}

var sorted = getSortedIntervals();
var merged = merge(sorted);
console.log(findSmallest(merged));







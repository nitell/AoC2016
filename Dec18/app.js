'use strict';

var rows = [];
rows.push('^.^^^.^..^....^^....^^^^.^^.^...^^.^.^^.^^.^^..^.^...^.^..^.^^.^..^.....^^^.^.^^^..^^...^^^...^...^.'.split(''));
for (var i = 1; i < 40; i++) {
    var newRow = [];
    for (var j = 0; j < rows[i-1].length; j++) {
        newRow.push(get(rows[i - 1], j))
    }
    rows.push(newRow);
}
rows.forEach(r => console.log(r.join('')));

var count = rows.map(r => r.filter(i => i == '.').length).reduce((a,b)=>a+b,0);
console.log('count: ' + count);



function get(previousRow, index) {
    var leftIsTrap = index > 0 && previousRow[index - 1] == '^';
    var centerIsTrap = previousRow[index] == '^';
    var rightIsTrap = index < previousRow.length - 1 && previousRow[index + 1] == '^';

    return (leftIsTrap && centerIsTrap && !rightIsTrap) ||
        (centerIsTrap && rightIsTrap && !leftIsTrap) ||
        (leftIsTrap && !centerIsTrap && !rightIsTrap) ||
        (rightIsTrap && !centerIsTrap && !leftIsTrap) ? '^' : '.';
}






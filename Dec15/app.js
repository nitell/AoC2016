'use strict';



var found = false;
var i = 0;
while (!found) {
    i++;
    console.log('Testing ' + i);
    found = works(i);

}
console.log('Answer: ' + i);


function works(i) {
    var discs = [
        { positions: 13, position: 1 },
        { positions: 19, position: 10 },
        { positions: 3, position: 2 },
        { positions: 7, position: 1 },
        { positions: 5, position: 3 },
        { positions: 17, position: 5 },
    ]
    //     var discs = [
    //     { positions: 5, position: 4 },
    //     { positions: 2, position:1 },     
    // ]
    for (var j = 0; j < discs.length; j++) {
        if ((discs[j].position + i + j + 1) % discs[j].positions != 0)
            return false;
    }
    return true;
}



'use strict';

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var sum = 0;


array.forEach(s => {
    if (s === "")
        return;
    var a = s.trim().split('[');
    var encryptedNameAndSectorId = a[0].split('-');
    var sectorId = parseInt(encryptedNameAndSectorId[encryptedNameAndSectorId.length -1]);
    var encryptedName = encryptedNameAndSectorId.slice(0,encryptedNameAndSectorId.length -1).join('');    
    var  checksum = a[1].substr(0,a[1].length-1);


    var dictionary = {};
    for (var i = 0, len = encryptedName.length; i < len; i++) {                
        if (typeof dictionary[encryptedName[i]] === "undefined" )
            dictionary[encryptedName[i]] = 1;
        else
            dictionary[encryptedName[i]] = dictionary[encryptedName[i]] + 1;
    }

    var items = [];
    for(var key in dictionary) {
        items.push({c: key, v: dictionary[key]});
    }
    
    var sortedLetters = items.sort((a,b)=> {
        if (a.v == b.v)
            return a.c.localeCompare(b.c);
        else
            return a.v > (b.v) ? -1 : 1;
    });
    
    var calculatedChecksum = sortedLetters.slice(0,5).map(l=>l.c).join("");
    if (calculatedChecksum == checksum)
        sum = sum +sectorId;            
});
console.log(sum);




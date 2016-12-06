'use strict';
var md5 = require('md5');
var doorId="wtnhxymk";
var password = "";


var i = 0;
var idAndInt;
while (password.length < 8) {
        var hash = md5(doorId + i);
        if (hash.substr(0,5) === "00000") {
            password = password + hash.substr(5,1);
        }
        i++;
}

console.log(password)



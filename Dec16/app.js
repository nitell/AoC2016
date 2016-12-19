'use strict';

function generateData() {
    var data = [0,0,1,0,1,0,0,0,1,0,1,1,1,1,0,1,0];
    var len = 272;
    while (data.length < len) {
        var b = data.slice();
        b.reverse();
        var inverse = b.map(c => c == 1 ? 0 : 1);
        data = data.concat(0).concat(inverse);
    }
    return data.slice(0, len);
}

function calcChecksum(input){
  var result = [];
  for(var i=0;i<input.length-1;i=i+2)
  {
      result.push(input[i] == input[i+1] ? 1 : 0)
  }  
  return result;
}



var data = generateData();
console.log(data);
var checksum = calcChecksum(data);
while (checksum.length % 2 == 0) {
    checksum = calcChecksum(checksum);
}
console.log(checksum);





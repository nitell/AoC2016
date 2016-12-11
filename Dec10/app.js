'use strict';

function createBot(id, lowerId, upperId) {
    return {
        id: id,
        value1: 0,
        value2: 0,
        lowerId: lowerId,
        upperId: upperId,

        lower: function () { return this.value1 < this.value2 ? this.value1 : this.value2; },
        upper: function () { return this.value1 > this.value2 ? this.value1 : this.value2; },


        receive: function (val) {
            if (this.value1 == 0)
                this.value1 = val;
            else
                this.value2 = val;

            if (this.value1 > 0 && this.value2 > 0) {
                if (this.lower() == 17 && this.upper() == 61)
                    console.log(this.id + " compared the values");

                if (typeof world[lowerId] != 'undefined')
                    world[lowerId].receive(this.lower());
                if (typeof world[upperId] != 'undefined')
                    world[upperId].receive(this.upper());
                this.value1 = this.value2 = 0;
            }
        }
    }
}

var fs = require('fs');
var array = fs.readFileSync('input.txt').toString().split("\n");

var world={};

array.forEach(s => {
    var match = /(.+) gives low to (.+) and high to (.+)/.exec(s);
    if (match != null) {
        var giver = match[1].replace(' ', '_');
        var receivesLow = match[2].replace(' ', '_');
        var receivesHigh = match[3].replace(' ', '_');
        world[giver] = createBot(giver, receivesLow, receivesHigh);

    }
});

array.forEach(s => {
    var match = /value ([0-9]+) goes to (.+)/.exec(s);
    if (match != null) {
        var botId=match[2].replace(' ', '_');
        world[botId].receive(parseInt(match[1]));
    }
});




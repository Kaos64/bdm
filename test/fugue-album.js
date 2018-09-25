var bdfugue = require('../lib/bdfugue');
var cheerio = require('cheerio');
var fs = require('fs');



fs.readFile(__dirname + '/macchabees.html', (err, data) => {
    var $ = cheerio.load(data);
    bdfugue.extractAlbum($)
        .then(album => {
            console.warn(album);
        });

})
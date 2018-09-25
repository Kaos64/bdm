var bdfugue = require('../lib/bdfugue');
var cheerio = require('cheerio');
var fs = require('fs');



fs.readFile(__dirname + '/achille-talon-series.html', (err, data) => {
    var $ = cheerio.load(data);
    bdfugue.extractSerie($)
        .then(serie => {
            console.warn(serie);
        });

})
var express = require('express');
var router = express.Router();

const rp = require('request-promise-native');
const cheerio = require('cheerio');

var model = require('../models/index');

//middleware to hanlde errors 
const awaitErrorHandlerFactory = middleware => {
    return async(req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

/* GET todo listing. */
router.get('/', awaitErrorHandlerFactory(async(req, res, next) => {
    var options = {
        uri: 'https://www.bdfugue.com/catalogsearch/result',
        qs: {
            q: req.query.q,
            p: req.query.p || 1,
        },
        transform: function(body) {
            return cheerio.load(body);
        }
    }
    const albums = [];

    // Recherche des album
    const $ = await rp(options);
    let results = $('div.couverture');
    for (let i = 0; i < results.length; i++) {
        albums.push({
            url: $('a', results[i]).attr('href'),
            title: $('a', results[i]).attr('title'),
            cover: $('img.product-image', results[i]).attr('src'),
            type: 'album'
        });
    }

    //  par séries
    results = $('div.category-content');
    for (let i = 0; i < results.length; i++) {
        albums.push({
            url: $('h2.subcat-name a', results[i]).attr('href'),
            cover: $('img', results[i]).attr('src'),
            title: $('h2.subcat-name a', results[i]).text(),
            type: 'serie'
        });
    }

    // find page count 
    const count = $('div.pages a.last') ? $('div.pages a.last').text() : 1;

    return res.json({
        error: false,
        result: {
            data: albums,
            query: req.query.q,
            pageSize: 24,
            pageIndex: req.query.p || 1,
            pageCount: count
        }
    });
}));

router.get('/album', awaitErrorHandlerFactory(async(req, res, next) => {
    var options = {
        uri: req.query.album,
        transform: function(body) {
            return cheerio.load(body);
        }
    }
    const albums = [];

    const $ = await rp(options);
    const results = $('div.couverture');
    for (let i = 0; i < results.length; i++) {
        albums.push({
            url: $('a', results[i]).attr('href'),
            title: $('a', results[i]).attr('title'),
            cover: $('img.product-image', results[i]).attr('src')
        });
    }

    return res.json({
        error: false,
        data: albums
    });
}));


router.get('/bd', awaitErrorHandlerFactory(async(req, res, next) => {


}));


/* POST todo. */
router.post('/', function(req, res, next) {

});


/* update todo. */
router.put('/:id', function(req, res, next) {

});


/* GET todo listing. */
router.delete('/:id', function(req, res, next) {

});

module.exports = router;
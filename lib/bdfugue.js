'use strict';

const rp = require('request-promise-native');
var cheerio = require('cheerio');

// Table de conversion Html to JSON
const tblProperties = {

    'series': ['S&#xE9;rie'],
    'volume': ['Tome N&#xB0;'],
    'title': ['Album'],
    'release': ['Date de parution'],
    'story': ['Type de r&#xE9;cit'],
    'reference': ['R&#xE9;f&#xE9;rence'],
    'shine': ['Reliure'],
    'pages': ['Nombre de pages'],
    'weight': ['Poids'],
    'size': ['Dimensions'],
    'editor': ['Editeur'],
    'collection': ['Collection :&#xA0;'],
    'author': ['Auteurs :&#xA0;'],
    'language': ['Langue']
}

const labelGenre = 'Genres, th&#xE8;mes et selections';

function __label2property(label, value) {

    for (let prop in tblProperties) {
        if (tblProperties[prop].indexOf(label) > -1) {
            let ret = {};
            if (prop == 'author') {
                const $ = cheerio.load(value);
                const auteurs = $('p');
                ret[prop] = [];
                for (let i = 0; i < auteurs.length; i++) {
                    const v = $(auteurs[i]).text();
                    const auth = (v.indexOf('(') == -1 ? v : v.substring(0, v.indexOf('('))).trim();
                    const action = v.match(/\(([^)]+)\)/)[1];
                    ret[prop].push({
                        name: auth,
                        actions: action.split(',')
                    })
                }
            } else {
                ret[prop] = value;
            }
            return ret;
        }
    }
    if (labelGenre == label) {
        return { genre: [] };
    }
    return null;
}



function extractAlbum($) {
    return new Promise((resolve, reject) => {
        let album = {
            id: null
        };

        // get cover
        album.cover = $('img', $('ul#gallery-top').first()).attr('src');

        // get Album detail
        const details = $('li', 'div#a-detail');
        for (let i = 0; i < details.length; i++) {
            const label = $(details[i]).children().first().html();
            $('span', $(details[i])).remove();
            const value = $(details[i]).html().replace(':', '').trim();
            if (album.hasOwnProperty('genre')) {
                album.genre.push(label);
            } else {
                const obj = __label2property(label, value);
                if (obj != null) {
                    Object.assign(album, obj);
                }
            }
        }

        // abstract 
        const src = $('iframe#iframe-desc').attr('src');
        if (src) {
            const opt = {
                uri: src,
                transform: function(body) {
                    return cheerio.load(body);
                }
            }
            rp(opt).then(($f) => {
                let abstract = $f('p#p-iframe');
                $f('strong', abstract).remove('strong');
                album.abstract = abstract.html();
                resolve(album);
            }).catch(err => {
                reject(err);
            })
        } else {
            resolve(album);
        }
    })
}



function extractSerie($) {
    return new Promise((resolve, reject) => {
        let series = {
            title: $('h1.titre-editorial').html(),
            abstract: $('div.category-description').html(),
            albums: _extractSerieAlbum($, $('div.couverture'))
        }
        let pages = $('div.pages a.lien');
        let resolved = 1;

        if (pages.length > 0) {

            for (let i = 1; i < pages.length; i++) {
                let opts = {
                    uri: $(pages[i]).attr('href'),
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                }
                rp(opts).then($p => {
                    series.albums = series.albums.concat(_extractSerieAlbum($p, $p('div.couverture')));
                    resolved++;
                    if (resolved == pages.length) {
                        resolve(series);
                    }

                }).catch((err) => reject(err));
            }
        } else {
            resolve(series);
        }


    });
}


function _extractSerieAlbum($, albums) {
    let ret = [];
    for (let i = 0; i < albums.length; i++) {
        ret.push({
            title: $('a', albums[i]).attr('title'),
            uri: $('a', albums[i]).attr('href'),
            cover: $('img.product-image', albums[i]).attr('src')
        })
    }

    return ret;
}

module.exports = {

    extractAlbum: extractAlbum,
    extractSerie: extractSerie
}
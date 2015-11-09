'use strict';

var _ = require('lodash');
var RssFeed = require('./rssFeed.model');
var Feed = require('../feed/feed.model');
var http = require('http');
var xml2jsParser = require('xml2js');
var unirest = require('unirest');
var CronJob = require('cron').CronJob;


var config = require('../../config.js');


var feedXml = config.returnConfig().feedAll;
var urlInicial = config.returnConfig().urlInicial;
var urlFinal = config.returnConfig().urlFinal;

var results = config.returnConfig().rssFeed;



var job = new CronJob({
    cronTime: '*/900 * * * * *',
    onTick: function () {
        actualizaFeed();
        actualizaFeedFijos();
        var fechaActual = new Date();
        //console.log(fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds() + ' - Actualizacion filtros!');

    },
    start: true,
    timeZone: "America/Los_Angeles"
});



var title = '';
var feedAct;

exports.actualizaPaginaFeed = function actulizaFeedsPagina() {
    actualizaFeed();
};


function actualizaFeedFijos() {
    getAllFeedFiexed().then(function (allFeedFixed) {

        allFeedFixed.forEach(function (items) {

            var itemLink = items.link;
            //console.log('Item--------------->' + itemLink);

            results.item({
                title: items.title,
                description: '',
                url: items.link, // link to the item
                guid: 'strGuid', // optional - defaults to url
                //categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
                author: 'Melkor', // optional - defaults to feed author property
                date: new Date() //'May 25, 2012', // any format that js Date can parse.
                    //lat: 33.417974, //optional latitude field for GeoRSS
                    //long: -111.933231, //optional longitude field for GeoRSS,
            });
        });
    });
}


function actualizaFeed() {

    results = config.returnConfig().rssFeed;

    //inicializamos la cuenta

    initContFeed();


    var cont = 0;
    var aa = [];

    unirest.get(feedXml).end(function (response) {

        if (response.statusCode === 200) {
            var parser = new xml2jsParser.Parser();
            var xmlObject = null;
            parser.parseString(response.body, function (err, result) {

                getAllFeed().then(function (allFeedDB) {
                    //allFeedDB.length
                    var items = result.rss.channel[0].item;
                    items.forEach(function (item) {

                        allFeedDB.forEach(function (itemDB) {
                            if (item.title[0].match(new RegExp(itemDB.title.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'ig'))) {

                                //anyadimos un contador
                                if (itemDB.quantity === null) {
                                    itemDB.quantity = 0;
                                    itemDB.titlefind.splice(0, itemDB.titlefind.length);
                                    //console.log('inicializado');
                                } else {
                                    //console.log('añado: ' + item.title[0]);
                                    itemDB.quantity++;
                                    if (!(item.title[0] in itemDB.titlefind)) {
                                        itemDB.titlefind.push(item.title[0]);
                                    }
                                    itemDB.save();
                                }

                                var urlImagen = item.description[0].substring(item.description[0].indexOf('src="'));

                                results.item({

                                    title: item.title,

                                    description: item.description[0].substring(item.description[0].indexOf('src="') + ('strc=').length, urlImagen.indexOf('"', 5) + ('strc=').length),
                                    url: item.link[0].replace(urlInicial, urlFinal), // link to the item
                                    guid: 'strGuid', // optional - defaults to url
                                    //categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
                                    author: 'Melkor', // optional - defaults to feed author property
                                    date: new Date(item.pubDate[0]) //'May 25, 2012', // any format that js Date can parse.
                                        //lat: 33.417974, //optional latitude field for GeoRSS
                                        //long: -111.933231, //optional longitude field for GeoRSS,
                                });
                                cont++;
                                //console.log(cont);

                                aa.push(itemDB);

                            } else {
                                cont++;
                            }
                        });
                    });
                });
            });
        }
    });

    //console.log('aaa->' + aa);
}





exports.index = function (req, res) {
    return res.status(200).set('Content-Type', 'text/xml').send(results.xml());
}

exports.indexjson = function (req, res) {
    //console.log('JSON');
    return res.status(200).json(results.items);
}


function initContFeed() {
    console.time('Tiempo actualización');


    Feed.find({
        fixed: null
    }).then(function (all) {
        all.forEach(function (item) {
            item.quantity = 0;
            //vaciamos el array
            item.titlefind.splice(0, item.titlefind.length);
            //console.log('Reset ' + item.description + '->' + item.titlefind.length);
            item.save(function (err) {
                if (err) {
                    console.log('Error al intentar modificar el registro->' + err);
                } else {
                    //console.log('Cambio realizado correctamente');
                }
            });
        });
    });
    console.timeEnd('Tiempo actualización');
}



function getAllFeed() {
    return Feed.find({
        fixed: null
    } /*, 'title'*/ ); //exec return promise
}

function getAllFeedFiexed() {

    return Feed.find({
        'fixed': true
    } /*, 'title'*/ ); //exec return promise
}



function getFeedTitle(title) {

    var auxRegex = new RegExp(title.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'ig');


    return Feed.find({

        title: auxRegex

    }).exec(); //exec return promise

}







// Get a single rssFeed

exports.show = function (req, res) {
    RssFeed.findById(req.params.id, function (err, rssFeed) {
        if (err) {
            return handleError(res, err);
        }

        if (!rssFeed) {
            return res.status(404).send('Not Found');
        }

        return res.json(rssFeed);
    });
};



// Creates a new rssFeed in the DB.

exports.create = function (req, res) {
    RssFeed.create(req.body, function (err, rssFeed) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(201).json(rssFeed);
    });
};



// Updates an existing rssFeed in the DB.

exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    RssFeed.findById(req.params.id, function (err, rssFeed) {
        if (err) {
            return handleError(res, err);
        }

        if (!rssFeed) {
            return res.status(404).send('Not Found');
        }

        var updated = _.merge(rssFeed, req.body);

        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }

            return res.status(200).json(rssFeed);
        });
    });
};



// Deletes a rssFeed from the DB.

exports.destroy = function (req, res) {

    RssFeed.findById(req.params.id, function (err, rssFeed) {
        if (err) {
            return handleError(res, err);
        }
        if (!rssFeed) {
            return res.status(404).send('Not Found');
        }

        rssFeed.remove(function (err) {
            if (err) {

                return handleError(res, err);

            }

            return res.status(204).send('No Content');

        });

    });

};



function handleError(res, err) {

    return res.status(500).send(err);

}
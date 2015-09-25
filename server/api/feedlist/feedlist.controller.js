'use strict';

var _ = require('lodash');

var RssFeed = require('./rssFeed.model');
var Feed = require('../feed/feed.model');
var configuracion = ('../../config.js')
var http = require('http');
var xml2jsParser = require('xml2js');
var unirest = require('unirest');
var CronJob = require('cron').CronJob;



//var global donde se alamcena el custom rss de la apli
var results = [];
var job = new CronJob({
    cronTime: configuracion.returnConfig().cronJob.cronTime,
    onTick: function () {
        actualizaFeed();
        console.log(new Date() + ' - Actualizando Feed con filtros!!');
    },
    start: configuracion.returnConfig().cronJob.start,
    timeZone: configuracion.returnConfig().cronJob.timeZone
});



var title = '';
var feedAct;
exports.actualizaPaginaFeed = function actulizaFeedsPagina() {
    actualizaFeed();
};


function actualizaFeed() {
    results = configuracion.returnconfig().rssFeed;

    var cont = 0;
    unirest.get(configuracion.returnConfig().feedAll).end(function (response) {
        if (response.statusCode === 200) {
            var parser = new xml2jsParser.Parser();
            var xmlObject = null;
            parser.parseString(response.body, function (err, result) {
                getAllFeed().then(function (allFeedDB) {
                    
                    var items = result.rss.channel[0].item;
                    items.forEach(function (item) {

                        allFeedDB.forEach(function (itemDB) {
                            if (item.title[0].match(new RegExp(itemDB.title.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'ig'))) {
                                var urlImagen = item.description[0].substring(item.description[0].indexOf('src="'));


                                results.items.push({
                                    title: item.title,
                                    description: item.description[0].substring(item.description[0].indexOf('src="') + ('strc=').length, urlImagen.indexOf('"', 5) + ('strc=').length),
                                    url: item.link[0].replace(configuracion.returnConfig().urlInicial, configuracion.returnConfig().urlFinal), // link to the item
                                    guid: 'strGuid', // optional - defaults to url
                                    //categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
                                    author: 'Eduardo Alvir', // optional - defaults to feed author property
                                    date: new Date(item.pubDate[0]) //'May 25, 2012', // any format that js Date can parse.
                                    //lat: 33.417974, //optional latitude field for GeoRSS
                                    //long: -111.933231, //optional longitude field for GeoRSS,
                                });
                                cont++;
                            } else {
                                cont++;

                            }
                        });
                    });
                });

            });

        }

    });

}





exports.index = function (req, res) {

    return res.status(200).json(results);

}



function getAllFeed() {
    return Feed.find({}, 'title'); //exec return promise
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
'use strict';

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tmdbs              ->  index
 */

//ejemplos
/*
Web que lo explica bien
http://www.johannesbader.ch/2013/11/tutorial-download-posters-with-the-movie-database-api-in-python/


buscamos el club de la lucha
https://api.themoviedb.org/3/search/movie?query=club de la lucha&api_key=b5bc5a01a1d5dfc40e7a1adb179a6869&append_to_response=releases,trailers

//todas las imagenes que tienen el id 500(el club de la lucha)
https://api.themoviedb.org/3/movie/550/images?api_key=b5bc5a01a1d5dfc40e7a1adb179a6869&language=en&include_image_language=en,null


//configuracion del api para saber cuales son las direcciones base
http://api.themoviedb.org/3/configuration?api_key=b5bc5a01a1d5dfc40e7a1adb179a6869

//
*/

var Tmdb = require('./tmdb.model');
var _ = require('lodash');

var apiKeyMoviedb = 'b5bc5a01a1d5dfc40e7a1adb179a6869';
var language = 'es';
var imgSize = 'w185';
var urlImg = 'https://image.tmdb.org/t/p/';
var unirest = require('unirest');


var MovieDB = require('moviedb')(apiKeyMoviedb);

// Gets a list of Tmdbs
exports.index = function (req, res) {

    MovieDB.searchMovie({
        query: req.query.filter,
        language: language
    }, function (err, returndata) {

        res.json([returndata]);
    });
};


// Gets a list of Tmdbs
exports.videos = function (req, res) {
    console.log('key->' + req.query.id);

    console.log('URL: http://api.themoviedb.org/3/movie/' + req.query.id + '/video?api_key=b5bc5a01a1d5dfc40e7a1adb179a6869');
    unirest.get('http://api.themoviedb.org/3/movie/'+req.query.id+'/videos?api_key=b5bc5a01a1d5dfc40e7a1adb179a6869').end(function (response) {
        res.json(response.body);
    });


};





// Get a single tmdb
exports.show = function (req, res) {
    Tmdb.findById(req.params.id, function (err, tmdb) {
        if (err) {
            return handleError(res, err);
        }
        if (!tmdb) {
            return res.send(404);
        }
        return res.json(tmdb);
    });
};

// Creates a new tmdb in the DB.
exports.create = function (req, res) {
    Tmdb.create(req.body, function (err, tmdb) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, tmdb);
    });
};

// Updates an existing tmdb in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Tmdb.findById(req.params.id, function (err, tmdb) {
        if (err) {
            return handleError(err);
        }
        if (!tmdb) {
            return res.send(404);
        }
        var updated = _.merge(tmdb, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, tmdb);
        });
    });
};

// Deletes a tmdb from the DB.
exports.destroy = function (req, res) {
    Tmdb.findById(req.params.id, function (err, tmdb) {
        if (err) {
            return handleError(res, err);
        }
        if (!tmdb) {
            return res.send(404);
        }
        tmdb.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
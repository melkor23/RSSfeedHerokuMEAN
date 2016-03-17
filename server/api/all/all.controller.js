'use strict';

var _ = require('lodash');
var All = require('./all.model');
var unirest = require('unirest');
var xml2jsParser = require('xml2js');
var config=require('../../config.js');


// Get list of alls
exports.index = function (req, res) {
    unirest.get(config.returnConfig().feedAll).end(function (response) {
        if (response.statusCode === 200) {
            var parser = new xml2jsParser.Parser();
            var xmlObject = null;

            parser.parseString(response.body, function (err, result) {
                return res.status(200).json(result.rss.channel[0].item);

            });
        }
    });
};



// Get a single all
exports.show = function (req, res) {
    All.findById(req.params.id, function (err, all) {
        if (err) {
            return handleError(res, err);
        }

        if (!all) {
            return res.status(404).send('Not Found');
        }

        return res.json(all);
    });
};



// Creates a new all in the DB.
exports.create = function (req, res) {
    All.create(req.body, function (err, all) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(201).json(all);
    });
};



// Updates an existing all in the DB.

exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    All.findById(req.params.id, function (err, all) {
        if (err) {
            return handleError(res, err);
        }

        if (!all) {
            return res.status(404).send('Not Found');
        }

        var updated = _.merge(all, req.body);
        updated.save(function (err) {

            if (err) {
                return handleError(res, err);
            }

            return res.status(200).json(all);

        });
    });
};



// Deletes a all from the DB.
exports.destroy = function (req, res) {
    All.findById(req.params.id, function (err, all) {
        if (err) {
            return handleError(res, err);
        }

        if (!all) {
            return res.status(404).send('Not Found');
        }

        all.remove(function (err) {

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
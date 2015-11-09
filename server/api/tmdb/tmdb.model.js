'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TmdbSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Tmdb', TmdbSchema);
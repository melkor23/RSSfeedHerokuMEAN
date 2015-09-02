'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedlistSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Feedlist', FeedlistSchema);

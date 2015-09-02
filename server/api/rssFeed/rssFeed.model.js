'use strict';



var mongoose = require('mongoose'),

    Schema = mongoose.Schema;



var RssFeedSchema = new Schema({

  name: String,

  info: String,

  active: Boolean

});



module.exports = mongoose.model('RssFeed', RssFeedSchema);

'use strict';



var mongoose = require('mongoose'),

    Schema = mongoose.Schema;



var FeedSchema = new Schema({



    title: String,

    link: String,

    description: String,

    author: String,

    pubDate: Date,
    
    //torrent de kat torrent
    fixed:Boolean,
    
    quantity:Number,
    
    titlefind: [String]
});


module.exports = mongoose.model('Feed', FeedSchema);

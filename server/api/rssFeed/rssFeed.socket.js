/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var RssFeed = require('./rssFeed.model');

exports.register = function(socket) {
  RssFeed.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  RssFeed.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('rssFeed:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('rssFeed:remove', doc);
}
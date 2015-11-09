/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tmdb = require('./tmdb.model');

exports.register = function(socket) {
  Tmdb.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tmdb.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tmdb:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tmdb:remove', doc);
}
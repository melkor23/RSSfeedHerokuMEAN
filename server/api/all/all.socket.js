/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var All = require('./all.model');

exports.register = function(socket) {
  All.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  All.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('all:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('all:remove', doc);
}
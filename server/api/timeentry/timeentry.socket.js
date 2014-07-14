/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Timeentry = require('./timeentry.model');

exports.register = function(socket) {
  Timeentry.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Timeentry.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('timeentry:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('timeentry:remove', doc);
}
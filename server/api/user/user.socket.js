/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('./user.model');
var log = require('npmlog');
var _ = require('lodash');

exports.register = function(socket) {
  User.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  User.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  // Must censor some stuff for the user object
  socket.emit('user:save', _.pick(doc, '_id', 'activeProjectId', 'activeTimeEntryId'));
}

function onRemove(socket, doc, cb) {
  // Must censor some stuff for the user object
  socket.emit('user:remove', _.pick(doc, '_id', 'activeProjectId', 'activeTimeEntryId'));
}


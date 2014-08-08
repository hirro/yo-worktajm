'use strict';

var _ = require('lodash');
var Timeentry = require('./timeentry.model');

// Get list of timeentries
exports.index = function(req, res) {
  var user = req.user;
  Timeentry
  .find({"createdBy": user._id})
  .exec(function (err, timeentries) {
    if(err) { return handleError(res, err); }
    return res.json(200, timeentries);
  });
};

// Get a single timeentry
exports.show = function(req, res) {
  Timeentry.findById(req.params.id, function (err, timeentry) {
    if(err) { return handleError(res, err); }
    if(!timeentry) { return res.send(404); }
    return res.json(timeentry);
  });
};

// Creates a new timeentry in the DB.
exports.create = function(req, res) {
  var timeentry = new Timeentry(req.body);
  timeentry.createdBy = req.user;
  timeentry.save(function(err) {
    if(err) { return handleError(res, err); }
    return res.json(201, timeentry);
  });
};

// Updates an existing timeentry in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Timeentry.findById(req.params.id, function (err, timeentry) {
    if (err) { return handleError(err); }
    if(!timeentry) { return res.send(404); }
    var updated = _.merge(timeentry, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, timeentry);
    });
  });
};

// Deletes a timeentry from the DB.
exports.destroy = function(req, res) {
  Timeentry.findById(req.params.id, function (err, timeentry) {
    if(err) { return handleError(res, err); }
    if(!timeentry) { return res.send(404); }
    timeentry.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
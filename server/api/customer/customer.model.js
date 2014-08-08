'use strict';

var session = require('express-session');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Plugins
var timestampPlugin = require('mongoose-timestamp');

var CustomerSchema = new Schema({
  name: { type: String, required: true },
  info: String,
  line1: String,
  line2: String,
  zip: String,
  country: String,
  referencePerson: String,

  // Auditing
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Unknown
  active: Boolean
});

/**
 * Pre-save hook
 */
CustomerSchema
  .pre('save', function(next) {
    console.log('Hej %s', session.name);
    next()
  });

// Plugins
CustomerSchema.plugin(timestampPlugin);

// Indexes
CustomerSchema.index({name: 1, createdBy: 1});

module.exports = mongoose.model('Customer', CustomerSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Plugins
var timestampPlugin = require('mongoose-timestamp');

var ProjectSchema = new Schema({
  name: { type: String, required: true },
  rate: { type: Number },
  description: { type: String },

  // Relationships
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: false },

  // Auditing
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Unknown
  info: String,
  active: Boolean

});

// Plugins
ProjectSchema.plugin(timestampPlugin);

// Indexes
ProjectSchema.index({name: 1, createdBy: 1});

module.exports = mongoose.model('Project', ProjectSchema);
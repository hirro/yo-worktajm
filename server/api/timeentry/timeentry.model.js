'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimeentrySchema = new Schema({
  startTime: {type: Date, required: true},
  endTime: Date,
  comment: String,

  /////////////////////////////////////////////////////////////////////////////
  // Relations
  /////////////////////////////////////////////////////////////////////////////
  project: {type: Schema.Types.ObjectId, required: true},
  customer: {type: Schema.Types.ObjectId, required: true},

  // Auditing
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Unknown
  info: String,
  active: Boolean
});

TimeentrySchema.index({project_id: 1, customer_id: 1});

module.exports = mongoose.model('Timeentry', TimeentrySchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimeentrySchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  start_time: Date,
  end_time: Date,
  comment: String,
  project_id: Schema.Types.ObjectId,
  customer_id: Schema.Types.ObjectId
});

TimeentrySchema.index({project_id: 1, customer_id: 1});

module.exports = mongoose.model('Timeentry', TimeentrySchema);
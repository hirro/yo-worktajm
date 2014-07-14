'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  user_id: Schema.Types.ObjectId,
  description: String,
  info: String,
  active: Boolean
});

ProjectSchema.index({name: 1, user_id: 1});

module.exports = mongoose.model('Project', ProjectSchema);
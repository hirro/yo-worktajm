'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String,
  info: String,
  line_1: String,
  line_2: String,
  zip: String,
  country: String,
  reference_person: String,

  // Relations
  address: Schema.Types.ObjectId,

  // Auditing
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now},

  // Unknown
  active: Boolean
});

/**
 * Pre-save hook
 */
CustomerSchema
  .pre('save', function(next) {
    //this.created_by = req?.session?.user_id?
    next()    
  });

CustomerSchema.index({name: 1, user_id: 1});

module.exports = mongoose.model('Customer', CustomerSchema);
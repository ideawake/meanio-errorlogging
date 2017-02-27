'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //moment = require('moment'),
    //_ = require('lodash');

var options = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  timestamps: true
};

// var now = new Date();

 /**
 * Error Schema
 */
var ErrorSchema = new Schema({
  errorUrl: {
    type: String
  },
  errorMessage: {
    type: String
  },
  stackTrace: {
    type: String
  },
  cause: {
    type: String
  },
  user: {
    name: {
      type: String
    },
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
}, options);

/**
 * Statics
 */
ErrorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Error', ErrorSchema);

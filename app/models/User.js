'use strict';

import Config from'config';
import mongoose from 'mongoose';

var schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  social: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return Config.socials.indexOf(value) >= 0;
      },
      message: `Allowed values ${Config.socials}`
    }
  },
  socialId: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'no_photo.png'
  },
  link: {
    type: String
  },
  accessToken: {
    type: String
  }
});
/**
 * Statics
 */

schema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

mongoose.model('User', schema);
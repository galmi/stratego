'use strict';

import Config from'config';
import mongoose from 'mongoose';

var schema = new mongoose.Schema({
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
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  photo: {
    type: String,
    default: 'no_photo.png'
  },
  accessToken: {
    type: String
  }
});

mongoose.model('User', schema);
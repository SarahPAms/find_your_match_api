'use strict';

// pairing-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pairingSchema = new Schema({
  courseName: { type: String },
  courseDate: { type: Date, 'default': Date.now },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const pairingModel = mongoose.model('pairing', pairingSchema);

module.exports = pairingModel;

'use strict';

const service = require('feathers-mongoose');
const pairing = require('./pairing-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: pairing,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/pairings', service(options));

  // Get our initialize service to that we can bind hooks
  const pairingService = app.service('/pairings');

  // Set up our before hooks
  pairingService.before(hooks.before);

  // Set up our after hooks
  pairingService.after(hooks.after);
};

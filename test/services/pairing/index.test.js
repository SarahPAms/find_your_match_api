'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('pairing service', function() {
  it('registered the pairings service', () => {
    assert.ok(app.service('pairings'));
  });
});

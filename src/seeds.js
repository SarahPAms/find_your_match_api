const feathers = require('feathers-client');
const authentication = require('feathers-authentication');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const host = 'http://localhost:3030';
const app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    type: 'local'
  }))
  .configure(rest(host).superagent(superagent));

// services
const userService = app.service('users');
const pairingService = app.service('pairings');

const user = {
  name: "Joe",
  email: "joe@blow.com",
  password: "abcd1234",
  admin: false
}

const pairing ={
  courseName: 'Ruby 101',
  courseDate: Date.now,
}

// Seed the user and pairing!
userService.create(user)
  .then((result) => {
    console.log('User created, authenticating as user...');

    app.authenticate({
      type: 'local',
      email: user.email,
      password: user.password,
    }).then((result) => {
      console.log('Authenticated, seeding pairings...');

      pairings.map((pairing) => {
        pairingService.create(Object.assign({}, pairing, { token: result.token }))
          .then((result) => {
            console.log('pairing seeded...');
          }).catch((error) => {
            console.error('Error seeding pairing!', error);
          });
      })
    }).catch((error) => {
      console.error('Error authenticating!', error);
    });
  })
  .catch((error) => {
    console.error('Error creating user!', error);
  });

'use strict';

const jwt = require('jsonwebtoken');
const env = require('../../envVariables');
const roleConfig = require('../../roleConfig');

function createToken(user) {
  let scopes = [];
  roleConfig.forEach((role) => {
	  if (user[role.name]) {
		  scopes.push(role.name);
	  }
  });


  // Sign the JWT
  return jwt.sign({ id: user.id, username: user.username, scope: scopes }, env.secret, { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = createToken;

'use strict';

import models from '../../models';
import env from '../../../envVariables.js';
import Boom from 'boom';
import createToken from '../../utils/createToken';
import userFunctions from '../../utils/userFunctions';
import nodemailer from 'nodemailer';
import buildAccountActivation from '../../emailTemplates/pendingAccountActivation';
import buildRegistrationEmail from '../../emailTemplates/registrationSuccess';
import xoauth2 from 'xoauth2';
let generator = xoauth2.createXOAuth2Generator(env.email.XOAuth2);

// listen for token updates
// you probably want to store these to a db
generator.on('token', (token) => {
	console.log(token);
});

let transporter = nodemailer.createTransport(({
  'service': 'Gmail',
  'auth': {
    'xoauth2': generator
  }
}));

// App users
let users = {
  create: (request, reply) => {
    userFunctions.hashPassword(request.payload.password, (err, hash) => {
      models.User.create({
          'email': request.payload.email,
          'username': request.payload.username,
          'password': hash,
          [request.payload.role]: request.payload.role === 'artist' || request.payload.role === 'recordLabel' ? false : true
        })
        .then((user) => {
					let newUserMailConfig;
					if (request.payload.role === 'artist' || request.payload.role === 'recordLabel') {
						newUserMailConfig = {
							'from': env.email.user,
							'to': user.email,
							'subject': 'Welcome to Tree Machine Records!',
							'html': buildAccountActivation(user)
						};
						transporter.sendMail({
							'from': env.email.user,
							'to': env.email.user,
							'subject': 'New Artist/Label Account Request',
							'html': buildAccountActivation(user)
						}, () => {
							console.log('Account Application: CCd to admin');
						});
					} else {
						newUserMailConfig = {
	            'from': env.email.user,
	            'to': user.email,
	            'subject': `Welcome to Tree Machine Records!`,
	            'html': buildRegistrationEmail(user)
	          };
					}
					transporter.sendMail(newUserMailConfig, (error, info) => {
						if (error) {
							console.log(error);
							reply('Something went wrong');
						} else {
							console.log(info.messageId + ': New email sent.');
							reply({
								'id': user.id,
								'email': user.email,
								'username': user.username,
								'roleFlags': userFunctions.getUserRoleFlags(user),
								'id_token': createToken(user)
							}).code(201);
						}
					});
        })
        .catch((response) => {
          throw Boom.badRequest(response);
        });
    });
  },
  authenticate: (request, reply) => {
    reply({
      'id': request.pre.user.id,
      'email': request.pre.user.email,
      'username': request.pre.user.username,
      'roleFlags': userFunctions.getUserRoleFlags(request.pre.user),
      'id_token': createToken(request.pre.user)
    }).code(201);
  },
  getAll: (request, reply) => {
    models.User.findAll({
        'attributes': ['username', 'email', 'createdAt'],
        'limit': 50,
        'order': '"updatedAt" DESC'
      })
      .then((users) => {
        reply(users).code(200);
      });
  },
	update: (request, reply) => {
    models.User.find({
      'where': {
        'id': request.params.id
      }
    }).then((user) => {
      if (user) {
        user.updateAttributes({
          'subscriber': request.payload.subscriber,
					'artist': request.payload.artist,
					'recordStore': request.payload.recordStore,
					'recordLabel': request.payload.recordLabel
        }).then((user) => {
          reply(user).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
	delete: (request, reply) => {
    models.User.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((user) => {
        if (user) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

export default users;

'use strict';

import models from '../../models';
import env from '../../../envVariables.js';
import Boom from 'boom';
import createToken from '../../utils/createToken';
import {getUserRoleFlags, hashPassword} from '../../utils/userFunctions';
import nodemailer from 'nodemailer';
import buildAccountActivation from '../../emailTemplates/pendingAccountActivation';
import buildRegistrationEmail from '../../emailTemplates/registrationSuccess';
import roleConfig from '../../../roleConfig';


let transporter = nodemailer.createTransport(({
	'service': 'Gmail',
	'auth': {
		'type': 'OAuth2',
		'clientId': env.email.OAuth2.clientId,
		'clientSecret': env.email.OAuth2.clientSecret
	}
}));

// App users
let users = {
  create: (request, reply) => {
    hashPassword(request.payload.password, (err, hash) => {
			let userConfig = {
        'email': request.payload.email,
        'username': request.payload.username,
        'firstName': request.payload.firstName,
        'lastName': request.payload.lastName,
        'password': hash
      };
			roleConfig.forEach((role) => {
				if (role.name !== 'public') {
					userConfig[role.name] = false;
				}
			});
			userConfig[request.payload.role] = true;
      models.User.create(userConfig)
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
							'html': buildAccountActivation(user),
							'auth': {
								'user': env.email.user,
								'refreshToken': env.email.OAuth2.refreshToken
							}
						}, () => {
							console.log('Account Application: CCd to admin');
						});
					} else {
						newUserMailConfig = {
	            'from': env.email.user,
	            'to': user.email,
	            'subject': `Welcome to Tree Machine Records!`,
	            'html': buildRegistrationEmail(user),
							'auth': {
								'user': env.email.user,
								'refreshToken': env.email.OAuth2.refreshToken
							}
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
								'firstName': user.firstName,
								'lastName': user.lastName,
								'roleFlags': getUserRoleFlags(user),
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
			'firstName': request.pre.user.firstName,
      'lastName': request.pre.user.lastName,
      'roleFlags': getUserRoleFlags(request.pre.user),
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
	'search': (request, reply) => {
    let searchByConfig;
    let pageSize = request.payload.pageSize || 20;
    let searchQuery = request.payload.searchQuery || '';
    let offset = (request.payload.pageNumber - 1) * pageSize;
    if (searchQuery) {
      searchByConfig = request.payload.searchBy ? {
        [request.payload.searchBy]: {
          '$like': '%' + searchQuery + '%'
        }
      } : {
        '$or': [{
            'username': {
              '$like': '%' + searchQuery + '%'
            }
          },
          {
            'email': {
              '$like': '%' + searchQuery + '%'
            }
          },
          {
            'lastName': {
              '$like': '%' + searchQuery + '%'
            }
          }
        ]
      };
    } else {
      searchByConfig = {};
    }
    models.User.findAndCountAll({
      'where': searchByConfig,
      'offset': offset,
      'limit': pageSize
    }).then((response) => {
      let count = response.count;
      let results = response.rows;
      let totalPages = Math.ceil(count === 0 ? 1 : (count / pageSize));

      reply({
        'pagination': {
          'pageNumber': request.payload.pageNumber,
          'pageSize': pageSize,
          'totalPages': totalPages,
          'totalResults': count
        },
        'results': results
      }).code(200);
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

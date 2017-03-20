'use strict';

import * as handlers from '../handlers';
import Joi from 'joi';
import {verifyUniqueUser, verifyCredentials} from '../../utils/userFunctions';

module.exports = [
  // Users
  {
    'method': 'POST',
    'path': '/api/users',
    'config': {
      'pre': [{
        'method': verifyUniqueUser
      }],
      'handler': handlers.users.create,
      'tags': ['api'],
      'description': 'Register a new user',
      'notes': 'Register a new user',
      'validate': {
        'payload': {
          'username': Joi.string().alphanum().min(2).max(300).required(),
          'email': Joi.string().email().required(),
          'password': Joi.string().required(),
          'role': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/users/authenticate',
    'config': {
      'pre': [{
        'method': verifyCredentials,
        'assign': 'user'
      }],
      'handler': handlers.users.authenticate,
      'tags': ['api'],
      'description': 'Authenticate an existing user',
      'notes': 'Authenticate an existing user',
      'validate': {
        'payload': Joi.alternatives().try(
          Joi.object({
            'username': Joi.string().alphanum().min(2).max(30).required(),
            'password': Joi.string().required()
          }),
          Joi.object({
            'username': Joi.string().email().required(),
            'password': Joi.string().required()
          })
        )
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/users',
    'handler': handlers.users.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all users',
      'notes': 'Get all users',
      'auth': {
        'strategy': 'jsonWebToken',
        'scope': ['siteAdmin']
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
	{
    'method': 'PUT',
    'path': '/api/users/{id}',
    'handler': handlers.users.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing user',
      'notes': 'Update an Existing user',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'subscriber': Joi.string().required(),
          'artist': Joi.string().required(),
          'recordStore': Joi.string().required(),
          'recordsLabel': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/users/{id}',
    'handler': handlers.users.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an user by id',
      'notes': 'Delete an user by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  }
];

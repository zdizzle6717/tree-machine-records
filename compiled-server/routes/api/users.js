'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _userFunctions = require('../../utils/userFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Users
{
  'method': 'POST',
  'path': '/api/users',
  'config': {
    'pre': [{
      'method': _userFunctions.verifyUniqueUser
    }],
    'handler': handlers.users.create,
    'tags': ['api'],
    'description': 'Register a new user',
    'notes': 'Register a new user',
    'validate': {
      'payload': {
        'username': _joi2.default.string().alphanum().min(2).max(300).required(),
        'email': _joi2.default.string().email().required(),
        'firstName': _joi2.default.string().required(),
        'lastName': _joi2.default.string().required(),
        'password': _joi2.default.string().required(),
        'role': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/users/authenticate',
  'config': {
    'pre': [{
      'method': _userFunctions.verifyCredentials,
      'assign': 'user'
    }],
    'handler': handlers.users.authenticate,
    'tags': ['api'],
    'description': 'Authenticate an existing user',
    'notes': 'Authenticate an existing user',
    'validate': {
      'payload': _joi2.default.alternatives().try(_joi2.default.object({
        'username': _joi2.default.string().alphanum().min(2).max(30).required(),
        'password': _joi2.default.string().required()
      }), _joi2.default.object({
        'username': _joi2.default.string().email().required(),
        'password': _joi2.default.string().required()
      }))
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
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
}, {
  'method': 'POST',
  'path': '/api/search/users',
  'handler': handlers.users.search,
  'config': {
    'tags': ['api'],
    'description': 'Return User/Player search results',
    'notes': 'Return User/Player search results',
    'validate': {
      'payload': {
        'maxResults': _joi2.default.optional(),
        'searchQuery': _joi2.default.optional(),
        'searchBy': _joi2.default.optional(),
        'pageNumber': _joi2.default.number().required(),
        'pageSize': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/users/{id}',
  'handler': handlers.users.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing user',
    'notes': 'Update an Existing user',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'subscriber': _joi2.default.string().required(),
        'artist': _joi2.default.string().required(),
        'recordStore': _joi2.default.string().required(),
        'recordsLabel': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/users/{id}',
  'handler': handlers.users.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an user by id',
    'notes': 'Delete an user by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}];
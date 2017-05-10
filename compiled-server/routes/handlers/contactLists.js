'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ContactList Route Configs
var contactLists = {
  get: function get(request, reply) {
    _models2.default.ContactList.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (contactList) {
      if (contactList) {
        reply(contactList).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.ContactList.findAll({
      'limit': 50
    }).then(function (contactLists) {
      reply(contactLists).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.ContactList.findOrCreate({
      'where': {
        'ArtistId': request.payload.ArtistId
      },
      'defaults': {
        'ArtistId': request.payload.ArtistId,
        'bandEmail': request.payload.bandEmail,
        'bandPhone': request.payload.bandPhone,
        'bandMailingAddress': request.payload.bandMailingAddress,
        'bookingManagerEmail': request.payload.bookingManagerEmail,
        'bookingManagerPhone': request.payload.bookingManagerPhone,
        'generalManagerEmail': request.payload.generalManagerEmail,
        'generalManagerPhone': request.payload.generalManagerPhone
      }
    }).spread(function (contactList, created) {
      if (!created) {
        reply(_boom2.default.badRequest('Contact List already exists for this artist.'));
      } else {
        reply(contactList).code(200);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.ContactList.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (contactList) {
      contactList.updateAttributes({
        'bandEmail': request.payload.bandEmail,
        'bandPhone': request.payload.bandPhone,
        'bandMailingAddress': request.payload.bandMailingAddress,
        'bookingManagerEmail': request.payload.bookingManagerEmail,
        'bookingManagerPhone': request.payload.bookingManagerPhone,
        'generalManagerEmail': request.payload.generalManagerEmail,
        'generalManagerPhone': request.payload.generalManagerPhone
      }).then(function (contactList) {
        if (contactList) {
          reply(contactList).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.ContactList.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (contactList) {
      if (contactList) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = contactLists;
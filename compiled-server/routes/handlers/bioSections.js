'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BioSection Route Configs
var bioSections = {
  get: function get(request, reply) {
    _models2.default.BioSection.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (bioSection) {
      if (bioSection) {
        reply(bioSection).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.BioSection.findAll({
      'limit': 50
    }).then(function (bioSections) {
      reply(bioSections).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.BioSection.findOrCreate({
      'where': {
        'ArtistId': request.payload.ArtistId
      },
      'defaults': {
        'ArtistId': request.payload.ArtistId,
        'content': request.payload.content,
        'sourceName': request.payload.sourceName,
        'sourceUrl': request.payload.sourceUrl
      }
    }).spread(function (bioSection, created) {
      if (!created) {
        reply(_boom2.default.badRequest('Artist already has a bio section.'));
      } else {
        reply(bioSection).code(200);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.BioSection.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (bioSection) {
      bioSection.updateAttributes({
        'content': request.payload.content,
        'sourceName': request.payload.sourceName,
        'sourceUrl': request.payload.sourceUrl
      }).then(function (bioSection) {
        if (bioSection) {
          reply(bioSection).code(200);
        } else {
          reply(bioSection).code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.BioSection.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (bioSection) {
      if (bioSection) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = bioSections;
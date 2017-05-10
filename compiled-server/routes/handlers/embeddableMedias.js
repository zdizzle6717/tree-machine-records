'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// EmbeddableMedia Route Configs
var embeddableMedias = {
  get: function get(request, reply) {
    _models2.default.EmbeddableMedia.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (embeddableMedia) {
      if (embeddableMedia) {
        reply(embeddableMedia).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.EmbeddableMedia.findAll({
      'limit': 50
    }).then(function (embeddableMedias) {
      reply(embeddableMedias).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.EmbeddableMedia.create({
      'ArtistId': request.payload.ArtistId,
      'type': request.payload.type,
      'title': request.payload.title,
      'linkUrl': request.payload.linkUrl,
      'embedUrl': request.payload.embedUrl
    }).then(function (embeddableMedia) {
      reply(embeddableMedia).code(200);
    });
  },
  update: function update(request, reply) {
    _models2.default.EmbeddableMedia.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (embeddableMedia) {
      embeddableMedia.updateAttributes({
        'type': request.payload.type,
        'title': request.payload.title,
        'linkUrl': request.payload.linkUrl,
        'embedUrl': request.payload.embedUrl
      }).then(function (embeddableMedia) {
        if (embeddableMedia) {
          reply(embeddableMedia).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.EmbeddableMedia.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (embeddableMedia) {
      if (embeddableMedia) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = embeddableMedias;
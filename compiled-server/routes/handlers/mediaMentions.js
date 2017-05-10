'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MediaMention Route Configs
var mediaMentions = {
  get: function get(request, reply) {
    _models2.default.MediaMention.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (mediaMention) {
      if (mediaMention) {
        reply(mediaMention).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.MediaMention.findAll({
      'limit': 50
    }).then(function (mediaMentions) {
      reply(mediaMentions).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.MediaMention.create({
      'ArtistId': request.payload.ArtistId,
      'AlbumReleaseId': request.payload.AlbumReleaseId,
      'author': request.payload.author,
      'date': request.payload.date,
      'linkUrl': request.payload.linkUrl,
      'title': request.payload.title,
      'text': request.payload.text
    }).then(function (mediaMention) {
      reply(mediaMention).code(200);
    });
  },
  update: function update(request, reply) {
    _models2.default.MediaMention.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (mediaMention) {
      mediaMention.updateAttributes({
        'author': request.payload.author,
        'date': request.payload.date,
        'linkUrl': request.payload.linkUrl,
        'title': request.payload.title,
        'text': request.payload.text
      }).then(function (mediaMention) {
        if (mediaMention) {
          reply(mediaMention).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.MediaMention.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (mediaMention) {
      if (mediaMention) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = mediaMentions;
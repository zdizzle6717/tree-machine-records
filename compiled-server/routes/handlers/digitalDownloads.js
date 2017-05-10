'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DigitalDownload Route Configs
var digitalDownloads = {
  get: function get(request, reply) {
    _models2.default.DigitalDownload.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (digitalDownload) {
      if (digitalDownload) {
        reply(digitalDownload).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.DigitalDownload.findAll({
      'limit': 50
    }).then(function (digitalDownloads) {
      reply(digitalDownloads).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.DigitalDownload.create({
      'AlbumReleaseId': request.payload.AlbumReleaseId,
      'title': request.payload.title,
      'fileName': request.payload.fileName,
      'downloadCodes': request.payload.downloadCodes
    }).then(function (digitalDownload) {
      reply(digitalDownload).code(200);
    });
  },
  update: function update(request, reply) {
    _models2.default.File.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (digitalDownload) {
      digitalDownload.updateAttributes({
        'title': request.payload.title,
        'fileName': request.payload.fileName,
        'downloadCodes': request.payload.downloadCodes
      }).then(function (digitalDownload) {
        if (digitalDownload) {
          reply(digitalDownload).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.DigitalDownload.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (digitalDownload) {
      if (digitalDownload) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = digitalDownloads;
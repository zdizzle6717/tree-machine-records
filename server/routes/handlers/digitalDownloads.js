'use strict';

const models = require('../../models');

// DigitalDownload Route Configs
let digitalDownloads = {
  get: (request, reply) => {
    models.DigitalDownload.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((digitalDownload) => {
        if (digitalDownload) {
          reply(digitalDownload).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.DigitalDownload.findAll({
        'limit': 50
      })
      .then((digitalDownloads) => {
        reply(digitalDownloads).code(200);
      });
  },
  create: (request, reply) => {
    models.DigitalDownload.create({
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'fileName': request.payload.fileName,
        'downloadCodes': request.payload.downloadCodes
      })
      .then((digitalDownload) => {
        reply(digitalDownload).code(200);
      });
  },
  update: (request, reply) => {
    models.File.find({
      'where': {
        'id': request.params.id
      }
    }).then((digitalDownload) => {
      digitalDownload.updateAttributes({
				'title': request.payload.title,
        'fileName': request.payload.fileName,
        'downloadCodes': request.payload.downloadCodes
      }).then((digitalDownload) => {
				if (digitalDownload) {
					reply(digitalDownload).code(200);
				} else {
					reply().code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.DigitalDownload.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((digitalDownload) => {
        if (digitalDownload) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = digitalDownloads;

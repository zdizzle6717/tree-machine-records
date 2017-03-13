'use strict';

const models = require('../../models');

// BioSection Route Configs
let bioSections = {
  get: (request, reply) => {
    models.BioSection.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((bioSection) => {
        if (bioSection) {
          reply(bioSection).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.BioSection.findAll({
        'limit': 50
      })
      .then((bioSections) => {
        reply(bioSections).code(200);
      });
  },
  create: (request, reply) => {
    models.BioSection.create({
        'ArtistId': request.payload.ArtistId,
        'content': request.payload.content,
        'sourceName': request.payload.sourceName,
        'sourceUrl': request.payload.sourceUrl
      })
      .then((bioSection) => {
        reply(bioSection).code(200);
      });
  },
  update: (request, reply) => {
    models.File.find({
      'where': {
        'id': request.params.id
      }
    }).then((bioSection) => {
      bioSection.updateAttributes({
        'content': request.payload.content,
        'sourceName': request.payload.sourceName,
        'sourceUrl': request.payload.sourceUrl
      }).then((bioSection) => {
				if (bioSection) {
					reply(bioSection).code(200);
				} else {
					reply(bioSection).code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.BioSection.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((bioSection) => {
        if (bioSection) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = bioSections;

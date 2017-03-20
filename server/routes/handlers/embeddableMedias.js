'use strict';

import models from '../../models';

// EmbeddableMedia Route Configs
let embeddableMedias = {
  get: (request, reply) => {
    models.EmbeddableMedia.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((embeddableMedia) => {
        if (embeddableMedia) {
          reply(embeddableMedia).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.EmbeddableMedia.findAll({
        'limit': 50
      })
      .then((embeddableMedias) => {
        reply(embeddableMedias).code(200);
      });
  },
  create: (request, reply) => {
    models.EmbeddableMedia.create({
        'ArtistId': request.payload.ArtistId,
        'type': request.payload.type,
        'title': request.payload.title,
        'linkUrl': request.payload.linkUrl,
        'embedUrl': request.payload.embedUrl
      })
      .then((embeddableMedia) => {
        reply(embeddableMedia).code(200);
      });
  },
  update: (request, reply) => {
    models.EmbeddableMedia.find({
      'where': {
        'id': request.params.id
      }
    }).then((embeddableMedia) => {
      embeddableMedia.updateAttributes({
        'type': request.payload.type,
        'title': request.payload.title,
        'linkUrl': request.payload.linkUrl,
        'embedUrl': request.payload.embedUrl
      }).then((embeddableMedia) => {
				if (embeddableMedia) {
        	reply(embeddableMedia).code(200);
				} else {
					reply().code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.EmbeddableMedia.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((embeddableMedia) => {
        if (embeddableMedia) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

export default embeddableMedias;

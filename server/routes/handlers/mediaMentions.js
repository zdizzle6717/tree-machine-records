'use strict';

import models from '../../models';

// MediaMention Route Configs
let mediaMentions = {
  get: (request, reply) => {
    models.MediaMention.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((mediaMention) => {
        if (mediaMention) {
          reply(mediaMention).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.MediaMention.findAll({
        'limit': 50
      })
      .then((mediaMentions) => {
        reply(mediaMentions).code(200);
      });
  },
  create: (request, reply) => {
    models.MediaMention.create({
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'author': request.payload.author,
        'date': request.payload.date,
        'linkUrl': request.payload.linkUrl,
        'title': request.payload.title,
        'text': request.payload.text
      })
      .then((mediaMention) => {
        reply(mediaMention).code(200);
      });
  },
  update: (request, reply) => {
    models.MediaMention.find({
      'where': {
        'id': request.params.id
      }
    }).then((mediaMention) => {
      mediaMention.updateAttributes({
        'author': request.payload.author,
        'date': request.payload.date,
        'linkUrl': request.payload.linkUrl,
        'title': request.payload.title,
        'text': request.payload.text
      }).then((mediaMention) => {
				if (mediaMention) {
					reply(mediaMention).code(200);
				} else {
					reply().code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.MediaMention.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((mediaMention) => {
        if (mediaMention) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

export default mediaMentions;

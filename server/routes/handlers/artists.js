'use strict';

const models = require('../../models');
const Boom = require('boom');

// Artist Route Configs
let artists = {
  get: (request, reply) => {
    models.Artist.find({
        'where': {
          'param': request.params.param
        },
        'include': [{
            'model': models.AlbumRelease,
            'include': [{
              'model': models.File
            }]
          },
          {
            'model': models.BioSection
          },
          {
            'model': models.ContactList
          },
          {
            'model': models.EmbeddableMedia
          },
          {
            'model': models.File,
            'include': {
              'model': models.Song,
              'include': {
                'model': models.AlbumRelease,
                'include': {
                  'model': models.File
                }
              }
            }
          },
          {
            'model': models.MediaMention
          },
          {
            'model': models.MerchItem
          },
          {
            'model': models.Origin
          },
          // {
          // 	model: models.FeaturedTrack
          // },
          {
            'model': models.SocialLinkList
          }
        ]
      })
      .then((artist) => {
        if (artist) {
          reply(artist).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getById: (request, reply) => {
    models.Artist.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((artist) => {
        if (artist) {
          reply(artist).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.Artist.findAll({
        'order': 'name',
        'limit': 50,
        'include': [{
            'model': models.File
          },
          {
            'model': models.Origin
          }
        ]
      })
      .then((artists) => {
        reply(artists).code(200);
      });
  },
  search: (request, reply) => {
    let query = request.payload.searchQuery ? request.payload.searchQuery.toLowerCase() : '';
    let totalPages = 0;
    let offset = (request.payload.pageNumber - 1) * request.payload.pageSize;
    models.Artist.findAndCountAll({
      'where': {
        '$or': [{
          'name': {
            '$ilike': '%' + query + '%'
          }
        }]
      },
      'include': [{
        'model': models.BioSection
      }],
      'order': [
        ['name', 'ASC']
      ],
      'offset': offset,
      'limit': request.payload.pageSize
    }).then((response) => {
      let totalResults = response.count;
      let totalPagesDecimal = totalResults === 0 ? 0 : (totalResults / request.payload.pageSize);
      totalPages = Math.ceil(totalPagesDecimal);
      reply({
        'pagination': {
          'pageNumber': request.payload.pageNumber,
          'pageSize': request.payload.pageSize,
          'totalPages': totalPages,
          'totalResults': response.rows.count
        },
        'results': response.rows
      }).code(200);
    });
  },
  create: (request, reply) => {
    models.Artist.create({
        'name': request.payload.name,
        'param': request.payload.param,
        'isCurrent': request.payload.isCurrent,
      })
      .then((artist) => {
				models.File.create({
					'ArtistId': artist.id,
					'identifier': request.payload.Files[0].identifier,
					'name': request.payload.Files[0].name,
					'size': request.payload.Files[0].size,
					'type': request.payload.Files[0].type
				}).then(() => {
					models.Artist.find({
						'where': {
							'id': artist.id
						},
						'include': [{
							'model': models.File
						}]
					}).then((artist) => {
						reply(artist).code(201);
					});
				});
      });
  },
  update: (request, reply) => {
    models.Artist.find({
      'where': {
        'id': request.params.id
      }
    }).then((artist) => {
      if (artist) {
        artist.updateAttributes({
          'name': request.payload.name,
          'param': request.payload.param,
          'isCurrent': request.payload.isCurrent,
        }).then((artist) => {
          reply(artist).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
  delete: (request, reply) => {
    models.Artist.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((artist) => {
        if (artist) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = artists;

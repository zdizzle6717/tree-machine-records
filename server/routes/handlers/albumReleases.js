'use strict';

const models = require('../../models');
import Boom from 'boom';

// AlbumRelease Route Configs
let albumReleases = {
  get: (request, reply) => {
    models.AlbumRelease.find({
        'where': {
          'param': request.params.param
        },
        'include': [{
            'model': models.File
          },
          {
            'model': models.MediaMention
          },
          {
            'model': models.MerchItem
          },
          {
            'model': models.Artist
          }
        ]
      })
      .then((albumRelease) => {
        if (albumRelease) {
          reply(albumRelease).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.AlbumRelease.findAll({
        'order': [
          ['releaseDate', 'DESC']
        ],
        'include': [{
            'model': models.File
          },
          {
            'model': models.Artist
          }
        ]
      })
      .then((albumReleases) => {
        reply(albumReleases).code(200);
      });
  },
  search: (request, reply) => {
    let query = request.payload.searchQuery ? request.payload.searchQuery.toLowerCase() : '';
    let totalPages = 0;
    let offset = (request.payload.pageNumber - 1) * request.payload.pageSize;
    models.AlbumRelease.findAndCountAll({
      'where': {
        '$or': [{
            'summary': {
              '$ilike': '%' + query + '%'
            }
          },
          {
            'catalogueNumber': {
              '$ilike': '%' + query + '%'
            }
          },
          {
            'title': {
              '$ilike': '%' + query + '%'
            }
          }
        ]
      },
      'include': [{
          'model': models.Artist
        },
        {
          'model': models.File
        }
      ],
      'order': [
        ['releaseDate', 'DESC']
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
  getFeaturedAlbums: (request, reply) => {
    models.FeaturedAlbumList.find({
        'where': {
          'id': 1
        }
      })
      .then((featuredAlbumList) => {
        models.AlbumRelease.findAll({
          'where': {
            '$or': [{
              'id': featuredAlbumList.albumReleaseIds
            }]
          },
          'attributes': ['caption', 'releaseDate', 'id', 'param'],
          'include': [{
              'model': models.File,
              'where': {
                'identifier': 'albumCover'
              },
              'attributes': ['name']
            },
            {
              'model': models.Artist,
              'attributes': ['param']
            }
          ]
        }).then((albumReleases) => {
          if (albumReleases) {
            reply(albumReleases).code(200);
          } else {
            reply([]).code(200);
          }
        });
      });
  },
  setFeaturedAlbums: (request, reply) => {
    models.FeaturedAlbumList.find({
        'where': {
          'id': 1
        }
      })
      .then((featuredAlbumList) => {
        if (featuredAlbumList) {
          featuredAlbumList.updateAttributes({
            albumReleaseIds: request.payload.albumReleaseIds
          }).then((featuredAlbumList) => {
            reply(featuredAlbumList).code(200);
          });
        } else {
          models.FeaturedAlbumList.create({
            albumReleaseIds: request.payload.albumReleaseIds
          }).then((featuredAlbumList) => {
            reply(featuredAlbumList).code(200);
          });
        }
      });
  },
  create: (request, reply) => {
		models.AlbumRelease.findOrCreate({
			'where': {
				'$or': [
					{ 'catalogueNumber': request.payload.catalogueNumber },
					{ 'param': request.payload.param },
				]
			},
			'defaults': {
	        'ArtistId': request.payload.ArtistId,
	        'caption': request.payload.caption,
	        'catalogueNumber': request.payload.catalogueNumber,
	        'iTunesUrl': request.payload.iTunesUrl,
	        'param': request.payload.param,
	        'releaseDate': request.payload.releaseDate,
	        'spotifyUrl': request.payload.spotifyUrl,
	        'summary': request.payload.summary,
	        'title': request.payload.title
	      }
		}).spread((albumRelease, created) => {
				if (!created) {
					reply(Boom.badRequest('Make sure catalogueNumber and param do not already exist'));
				} else {
					reply(albumRelease).code(201);
				}
      });
  },
  update: (request, reply) => {
    models.AlbumRelease.find({
      'where': {
        'id': request.params.id
      }
    }).then((albumRelease) => {
      albumRelease.updateAttributes({
        'caption': request.payload.caption,
        'catalogueNumber': request.payload.catalogueNumber,
        'iTunesUrl': request.payload.iTunesUrl,
        'param': request.payload.param,
        'releaseDate': request.payload.releaseDate,
        'spotifyUrl': request.payload.spotifyUrl,
        'summary': request.payload.summary,
        'title': request.payload.title
      }).then((albumRelease) => {
				if(albumRelease) {
					reply(albumRelease).code(200);
				} else {
					reply().code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.AlbumRelease.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((albumRelease) => {
        if (albumRelease) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = albumReleases;

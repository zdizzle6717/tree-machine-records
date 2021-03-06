'use strict';

import models from '../../models';

// Song Route Configs
let songs = {
  get: (request, reply) => {
    models.Song.find({
        'where': {
          'id': request.params.id
        },
        'include': [{
            'model': models.AlbumRelease,
            'attributes': ['title', 'param'],
            'include': [{
              'model': models.Artist,
              'attributes': ['name', 'param']
            }]
          },
          {
            'model': models.File
          },
        ]
      })
      .then((song) => {
        if (song) {
          reply(song).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.Song.findAll({
        'limit': 50,
        'include': [{
            'model': models.AlbumRelease,
            'attributes': ['title', 'param'],
            'include': [{
              'model': models.Artist,
              'attributes': ['name', 'param']
            }]
          },
          {
            'model': models.File
          },
        ]
      })
      .then((songs) => {
        reply(songs).code(200);
      });
  },
  getFeaturedSongs: (request, reply) => {
    models.FeaturedSongList.find({
        'where': {
          'id': 1
        }
      })
      .then((featuredSongList) => {
        models.Song.findAll({
          'where': {
            '$or': [{
              'id': featuredSongList.songIds
            }]
          },
          'order': 'id',
          'include': [{
              'model': models.AlbumRelease,
              'attributes': ['title', 'param'],
              'include': [{
                'model': models.Artist,
                'attributes': ['name', 'param']
              }]
            },
            {
              'model': models.File
            },
          ]
        }).then((songs) => {
          if (songs) {
            reply(songs).code(200);
          } else {
            reply([]).code(200);
          }
        });
      });
  },
  setFeaturedSongs: (request, reply) => {
    models.FeaturedSongList.find({
        'where': {
          'id': 1
        }
      })
      .then((featuredSongList) => {
        if (featuredSongList) {
          featuredSongList.updateAttributes({
            'songIds': request.payload.songIds
          }).then((featuredSongList) => {
            reply(featuredSongList).code(200);
          });
        } else {
          models.FeaturedSongList.create({
            'songIds': request.payload.songIds
          }).then((featuredSongList) => {
            reply(featuredSongList).code(200);
          });
        }
      });
  },
  create: (request, reply) => {
    models.Song.create({
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'fileName': request.payload.fileName
      })
      .then((song) => {
        reply(song).code(200);
      });
  },
  update: (request, reply) => {
    models.Song.find({
      'where': {
        'id': request.params.id
      }
    }).then((song) => {
      song.updateAttributes({
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'fileName': request.payload.fileName
      }).then((song) => {
        if (song) {
          reply(song).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: (request, reply) => {
    models.Song.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((song) => {
        if (song) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

export default songs;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Song Route Configs
var songs = {
  get: function get(request, reply) {
    _models2.default.Song.find({
      'where': {
        'id': request.params.id
      },
      'include': [{
        'model': _models2.default.AlbumRelease,
        'attributes': ['title', 'param'],
        'include': [{
          'model': _models2.default.Artist,
          'attributes': ['name', 'param']
        }]
      }, {
        'model': _models2.default.File
      }]
    }).then(function (song) {
      if (song) {
        reply(song).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.Song.findAll({
      'limit': 50,
      'include': [{
        'model': _models2.default.AlbumRelease,
        'attributes': ['title', 'param'],
        'include': [{
          'model': _models2.default.Artist,
          'attributes': ['name', 'param']
        }]
      }, {
        'model': _models2.default.File
      }]
    }).then(function (songs) {
      reply(songs).code(200);
    });
  },
  getFeaturedSongs: function getFeaturedSongs(request, reply) {
    _models2.default.FeaturedSongList.find({
      'where': {
        'id': 1
      }
    }).then(function (featuredSongList) {
      _models2.default.Song.findAll({
        'where': {
          '$or': [{
            'id': featuredSongList.songIds
          }]
        },
        'order': 'id',
        'include': [{
          'model': _models2.default.AlbumRelease,
          'attributes': ['title', 'param'],
          'include': [{
            'model': _models2.default.Artist,
            'attributes': ['name', 'param']
          }]
        }, {
          'model': _models2.default.File
        }]
      }).then(function (songs) {
        if (songs) {
          reply(songs).code(200);
        } else {
          reply([]).code(200);
        }
      });
    });
  },
  setFeaturedSongs: function setFeaturedSongs(request, reply) {
    _models2.default.FeaturedSongList.find({
      'where': {
        'id': 1
      }
    }).then(function (featuredSongList) {
      if (featuredSongList) {
        featuredSongList.updateAttributes({
          'songIds': request.payload.songIds
        }).then(function (featuredSongList) {
          reply(featuredSongList).code(200);
        });
      } else {
        _models2.default.FeaturedSongList.create({
          'songIds': request.payload.songIds
        }).then(function (featuredSongList) {
          reply(featuredSongList).code(200);
        });
      }
    });
  },
  create: function create(request, reply) {
    _models2.default.Song.create({
      'ArtistId': request.payload.ArtistId,
      'AlbumReleaseId': request.payload.AlbumReleaseId,
      'title': request.payload.title,
      'fileName': request.payload.fileName
    }).then(function (song) {
      reply(song).code(200);
    });
  },
  update: function update(request, reply) {
    _models2.default.Song.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (song) {
      song.updateAttributes({
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'fileName': request.payload.fileName
      }).then(function (song) {
        if (song) {
          reply(song).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.Song.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (song) {
      if (song) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = songs;
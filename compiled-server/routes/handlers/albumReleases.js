'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// AlbumRelease Route Configs
var albumReleases = {
  get: function get(request, reply) {
    _models2.default.AlbumRelease.find({
      'where': {
        'param': request.params.param
      },
      'include': [{
        'model': _models2.default.File
      }, {
        'model': _models2.default.MediaMention
      }, {
        'model': _models2.default.MerchItem
      }, {
        'model': _models2.default.Artist
      }]
    }).then(function (albumRelease) {
      if (albumRelease) {
        reply(albumRelease).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.AlbumRelease.findAll({
      'order': [['releaseDate', 'DESC']],
      'include': [{
        'model': _models2.default.File
      }, {
        'model': _models2.default.Artist
      }]
    }).then(function (albumReleases) {
      reply(albumReleases).code(200);
    });
  },
  search: function search(request, reply) {
    var query = request.payload.searchQuery ? request.payload.searchQuery.toLowerCase() : '';
    var totalPages = 0;
    var offset = (request.payload.pageNumber - 1) * request.payload.pageSize;
    _models2.default.AlbumRelease.findAndCountAll({
      'where': {
        '$or': [{
          'summary': {
            '$ilike': '%' + query + '%'
          }
        }, {
          'catalogueNumber': {
            '$ilike': '%' + query + '%'
          }
        }, {
          'title': {
            '$ilike': '%' + query + '%'
          }
        }]
      },
      'include': [{
        'model': _models2.default.Artist
      }, {
        'model': _models2.default.File
      }],
      'order': [['releaseDate', 'DESC']],
      'offset': offset,
      'limit': request.payload.pageSize
    }).then(function (response) {
      var totalResults = response.count;
      var totalPagesDecimal = totalResults === 0 ? 0 : totalResults / request.payload.pageSize;
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
  getFeaturedAlbums: function getFeaturedAlbums(request, reply) {
    _models2.default.FeaturedAlbumList.find({
      'where': {
        'id': 1
      }
    }).then(function (featuredAlbumList) {
      _models2.default.AlbumRelease.findAll({
        'where': {
          '$or': [{
            'id': featuredAlbumList.albumReleaseIds
          }]
        },
        'attributes': ['caption', 'releaseDate', 'id', 'param'],
        'include': [{
          'model': _models2.default.File,
          'where': {
            'identifier': 'albumCover'
          },
          'attributes': ['name']
        }, {
          'model': _models2.default.Artist,
          'attributes': ['param']
        }]
      }).then(function (albumReleases) {
        if (albumReleases) {
          reply(albumReleases).code(200);
        } else {
          reply([]).code(200);
        }
      });
    });
  },
  setFeaturedAlbums: function setFeaturedAlbums(request, reply) {
    _models2.default.FeaturedAlbumList.find({
      'where': {
        'id': 1
      }
    }).then(function (featuredAlbumList) {
      if (featuredAlbumList) {
        featuredAlbumList.updateAttributes({
          albumReleaseIds: request.payload.albumReleaseIds
        }).then(function (featuredAlbumList) {
          reply(featuredAlbumList).code(200);
        });
      } else {
        _models2.default.FeaturedAlbumList.create({
          albumReleaseIds: request.payload.albumReleaseIds
        }).then(function (featuredAlbumList) {
          reply(featuredAlbumList).code(200);
        });
      }
    });
  },
  create: function create(request, reply) {
    _models2.default.AlbumRelease.findOrCreate({
      'where': {
        '$or': [{ 'catalogueNumber': request.payload.catalogueNumber }, { 'param': request.payload.param }]
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
    }).spread(function (albumRelease, created) {
      if (!created) {
        reply(_boom2.default.badRequest('Make sure catalogueNumber and param do not already exist'));
      } else {
        reply(albumRelease).code(201);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.AlbumRelease.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (albumRelease) {
      albumRelease.updateAttributes({
        'caption': request.payload.caption,
        'catalogueNumber': request.payload.catalogueNumber,
        'iTunesUrl': request.payload.iTunesUrl,
        'param': request.payload.param,
        'releaseDate': request.payload.releaseDate,
        'spotifyUrl': request.payload.spotifyUrl,
        'summary': request.payload.summary,
        'title': request.payload.title
      }).then(function (albumRelease) {
        if (albumRelease) {
          reply(albumRelease).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.AlbumRelease.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (albumRelease) {
      if (albumRelease) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = albumReleases;
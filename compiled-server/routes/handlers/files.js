'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _envVariables = require('../../../envVariables.js');

var _envVariables2 = _interopRequireDefault(_envVariables);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _imagemagickStream = require('imagemagick-stream');

var _imagemagickStream2 = _interopRequireDefault(_imagemagickStream);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// File Upload Route Configs
var files = {
  create: function create(request, reply) {
    _models2.default.File.create({
      'SongId': request.payload.SongId,
      'ArtistId': request.payload.ArtistId,
      'AlbumReleaseId': request.payload.AlbumReleaseId,
      'MerchItemId': request.payload.MerchItemId,
      'identifier': request.payload.identifier,
      'locationUrl': request.payload.locationUrl,
      'label': request.payload.label,
      'name': request.payload.name,
      'size': request.payload.size,
      'type': request.payload.type
    }).then(function (file) {
      reply(file).code(200);
    });
  },
  update: function update(request, reply) {
    _models2.default.File.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (file) {
      if (file) {
        file.updateAttributes({
          'SongId': request.payload.SongId,
          'ArtistId': request.payload.ArtistId,
          'AlbumReleaseId': request.payload.AlbumReleaseId,
          'identifier': request.payload.identifier,
          'locationUrl': request.payload.locationUrl,
          'label': request.payload.label,
          'name': request.payload.name,
          'size': request.payload.size,
          'type': request.payload.type
        }).then(function (file) {
          reply(file).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
  add: function add(request, reply) {
    var data = request.payload;
    if (!data.path || !data.fileSize) {
      reply(_boom2.default.badRequest('A \'path\' and \'fileSize\' attribute must be appended to the FormData object'));
    } else if (data.file) {
      var resizeArray = void 0;
      if (data.identifier === 'albumCover') {
        resizeArray = [].concat([{
          'name': '2400-' + data.file.hapi.filename,
          'resize': (0, _imagemagickStream2.default)().resize('2400x2400').quality(100)
        }], [{
          'name': '700-' + data.file.hapi.filename,
          'resize': (0, _imagemagickStream2.default)().resize('700x700').quality(100)
        }], [{
          'name': '300-' + data.file.hapi.filename,
          'resize': (0, _imagemagickStream2.default)().resize('300x300').quality(100)
        }], [{
          'name': '150-' + data.file.hapi.filename,
          'resize': (0, _imagemagickStream2.default)().resize('150x150').quality(100)
        }]);
      }

      var filename = (0, _moment2.default)(Date.now()).format('MM-DD-YYYY') + '-' + data.file.hapi.filename;
      var location = __dirname + '/../../..' + _envVariables2.default.uploadPath + data.path;
      var path = location + filename;

      // Using ensureDir instead of ensureFile allow us to overwrite files if they already exist
      _fsExtra2.default.ensureDir(location, function (err) {
        if (err) {
          reply(_boom2.default.notAcceptable('An error occured during ensureDir'));
          return;
        }

        // Create the initial file to read from
        var file = _fsExtra2.default.createWriteStream(path);
        data.file.pipe(file);
        data.file.on('end', function (err) {
          if (err) {
            reply(_boom2.default.notAcceptable('An error occured on file end (resizeArray loop)'));
            return;
          }

          // TODO: Double check that type is correct
          var successResponse = {
            'file': {
              'name': data.identifier === 'albumCover' ? data.file.hapi.filename : filename,
              'size': data.fileSize,
              'type': data.file.hapi.headers['content-type']
            },
            'filename': data.file.hapi.filename,
            'headers': data.file.hapi.headers,
            'status': 200,
            'statusText': 'File uploaded successfully!'
          };

          if (resizeArray) {
            // TODO: Test that the count is working
            var count = 0;
            resizeArray.forEach(function (resizeConfig) {
              var read = _fsExtra2.default.createReadStream(path);
              var resizePath = location + resizeConfig.name;
              var write = _fsExtra2.default.createWriteStream(resizePath);
              read.pipe(resizeConfig.resize).pipe(write);

              read.on('end', function (err) {
                if (err) {
                  reply(_boom2.default.notAcceptable('An error occured on file end (resizeArray loop)'));
                  return;
                }
                // Set file folder permissions and owners/groups just for safe measure
                _fsExtra2.default.chownSync(location, _envVariables2.default.serverUID, _envVariables2.default.serverGID);
                _fsExtra2.default.chmodSync(location, '0775');
                count++;
                if (count >= resizeArray.length) {
                  reply(JSON.stringify(successResponse)).code(200);
                }
              });
            });
          } else {
            // Set file folder permissions and owners/groups just for safe measure
            _fsExtra2.default.chown(location, _envVariables2.default.serverUID, _envVariables2.default.serverGID, function (err) {
              if (err) {
                reply(_boom2.default.notAcceptable('chown: ' + err));
                return;
              }
              _fsExtra2.default.chmod(location, '0775', function (err) {
                if (err) {
                  reply(_boom2.default.notAcceptable('chown: ' + err));
                  return;
                }

                reply(JSON.stringify(successResponse));
              });
            });
          }
        });
      });
    } else {
      reply(_boom2.default.badRequest('There was an error uploading your file.'));
    }
  },
  getAll: function getAll(request, reply) {
    _models2.default.File.findAll({
      'limit': 50
    }).then(function (files) {
      reply(files).code(200);
    });
  },
  // Be carefull not to delete parent folder(s)
  // fse.unlink()
  delete: function _delete(request, reply) {
    _models2.default.File.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (file) {
      if (!file.locationUrl || file.locationUrl.slice(-1) === '/' || file.locationUrl.indexOf('.') < 0) {
        reply(_boom2.default.notAcceptable('File object is missing a proper locationUrl property'));
      } else {
        var locationUrl = __dirname + '/../../..' + _envVariables2.default.uploadPath + file.locationUrl;
        _models2.default.File.destroy({
          'where': {
            'id': request.params.id
          }
        }).then(function (file) {
          if (file) {
            _fsExtra2.default.unlink(locationUrl, function (err) {
              if (err) {
                reply(_boom2.default.badRequest('Error deleting file.'));
                return;
              }
              reply().code(200);
            });
          } else {
            reply().code(404);
          }
        });
      }
    });
  }
};

exports.default = files;
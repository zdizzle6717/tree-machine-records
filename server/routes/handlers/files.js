'use strict';

const models = require('../../models');
const fse = require('fs-extra');
const env = require('../../../envVariables.js');
const Boom = require('boom');
const im = require('imagemagick-stream');
const moment = require('moment');

// File Upload Route Configs
let files = {
  create: (request, reply) => {
    models.File.create({
        'SongId': request.payload.SongId,
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'MerchItemId': request.payload.MerchItemId,
        'identifier': request.payload.identifier,
        'imageUrl': request.payload.imageUrl,
        'label': request.payload.label,
        'name': request.payload.name,
        'size': request.payload.size,
        'type': request.payload.type
      })
      .then((file) => {
        reply(file).code(200);
      });
  },
  update: (request, reply) => {
    models.File.find({
      'where': {
        'id': request.params.id
      }
    }).then((file) => {
      if (file) {
        file.updateAttributes({
            'SongId': request.payload.SongId,
            'ArtistId': request.payload.ArtistId,
            'AlbumReleaseId': request.payload.AlbumReleaseId,
            'identifier': request.payload.identifier,
            'imageUrl': request.payload.imageUrl,
            'label': request.payload.label,
            'name': request.payload.name,
            'size': request.payload.size,
            'type': request.payload.type
          })
          .then((file) => {
            reply(file).code(200);
          });
      } else {
        reply().code(404);
      }
    });
  },
  add: (request, reply) => {
    let counter = 0;
    let tick = 0;
    let data = request.payload;
    if (!data.path || !data.fileSize) {
      reply(Boom.badRequest(`A 'path' and 'fileSize' attribute must be appended to the FormData object`));
    } else if (data.file) {
      let resizeArray;
      if (data.identifier === 'albumCover') {
        resizeArray = [].concat(
          [{
            'name': `2400-${data.file.hapi.filename}`,
            'resize': im().resize('2400x2400').quality(100)
          }], [{
            'name': `700-${data.file.hapi.filename}`,
            'resize': im().resize('700x700').quality(100)
          }], [{
            'name': `300-${data.file.hapi.filename}`,
            'resize': im().resize('300x300').quality(100)
          }], [{
            'name': `150-${data.file.hapi.filename}`,
            'resize': im().resize('150x150').quality(100)
          }]
        );
      }

      let filename = moment(Date.now()).format('MM-DD-YYYY') + '-' + data.file.hapi.filename;
      let location = __dirname + '/../../..' + env.uploadPath + data.path;
      let path = location + filename;

      // Using ensureDir instead of ensureFile allow us to overwrite files if they already exist
      fse.ensureDir(location, (err) => {
        if (err) {
          reply(Boom.notAcceptable('An error occured during ensureDir'));
          return;
        }

        // Create the initial file to read from
				let file = fse.createWriteStream(path);
        data.file.pipe(file);
        data.file.on('end', (err) => {
          if (err) {
            reply(Boom.notAcceptable('An error occured on file end (resizeArray loop)'));
            return;
          }

          let successResponse = {
            'file': {
              'name': data.file.hapi.filename,
              'size': data.fileSize,
              'type': data.file.hapi.headers['content-type']
            },
            'filename': data.file.hapi.filename,
            'headers': data.file.hapi.headers,
            'status': 200,
            'statusText': 'File uploaded successfully!'
          };

          if (resizeArray) {
            resizeArray.forEach((resizeConfig) => {
              let read = fse.createReadStream(path);
              let resizePath = location + resizeConfig.name;
              let write = fse.createWriteStream(resizePath);
              read.pipe(resizeConfig.resize).pipe(write);

              read.on('end', (err) => {
                if (err) {
                  reply(Boom.notAcceptable('An error occured on file end (resizeArray loop)'));
                  return;
                }
                // Set file folder permissions and owners/groups just for safe measure
                fse.chownSync(resizePath, env.serverUID, env.serverGID);
                fse.chmodSync(resizePath, '0775');
                counter++;
              });
            });

            // This continuously checks for all files to be created (since on 'end' happens async)
            // TODO: Find a better way (RxJs???)
            let waiter = setInterval(() => {
              tick++;
              if (counter >= resizeArray.length) {
                clearInterval(waiter);
                reply(JSON.stringify(successResponse)).code(200);
              }
              // Breakout if this takes more than 5 minutes
              if (tick > 100 * 10 * 60 * 5) {
                clearInterval(waiter);
                reply(Boom.clientTimeout('Something when wrong while resizing and saving images'));
              }
            }, 100);
          } else {
            // Set file folder permissions and owners/groups just for safe measure
            fse.chown(location, env.serverUID, env.serverGID, (err) => {
              if (err) {
                reply(Boom.notAcceptable('chown: ' + err));
                return;
              }
              fse.chmod(location, '0775', (err) => {
                if (err) {
                  reply(Boom.notAcceptable('chown: ' + err));
                  return;
                }

                reply(JSON.stringify(successResponse));
              });
            });
          }
        });
      });
    } else {
      reply(Boom.badRequest('There was an error uploading your file.'));
    }
  },
  getAll: (request, reply) => {
    models.File.findAll({
        'limit': 50
      })
      .then((files) => {
        reply(files).code(200);
      });
  },
  delete: (request, reply) => {
    models.File.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((file) => {
        if (file) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = files;

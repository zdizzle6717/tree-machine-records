'use strict';

import models from '../../models';
import fse from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';
import im from 'imagemagick-stream';
import moment from 'moment';

// File Upload Route Configs
let files = {
  create: (request, reply) => {
    models.File.create({
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
            'locationUrl': request.payload.locationUrl,
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

          // TODO: Double check that type is correct
          let successResponse = {
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
						let count = 0;
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
                fse.chownSync(location, env.serverUID, env.serverGID);
                fse.chmodSync(location, '0775');
                count++;
								if (count >= resizeArray.length) {
									reply(JSON.stringify(successResponse)).code(200);
								}
              });
            });
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
  // Be carefull not to delete parent folder(s)
  // fse.unlink()
  delete: (request, reply) => {
    models.File.find({
      'where': {
        'id': request.params.id
      }
    }).then((file) => {
      if (!file.locationUrl || file.locationUrl.slice(-1) === '/' || file.locationUrl.indexOf('.') < 0) {
        reply(Boom.notAcceptable('File object is missing a proper locationUrl property'));
      } else {
				let locationUrl = __dirname + '/../../..' + env.uploadPath + file.locationUrl;
        models.File.destroy({
            'where': {
              'id': request.params.id
            }
          })
          .then((file) => {
            if (file) {
							fse.unlink(locationUrl, (err) => {
								if (err) {
									reply(Boom.badRequest('Error deleting file.'));
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

export default files;

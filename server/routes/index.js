'use strict';

let handlers = require('./handlers');
let Joi = require('joi');
let models = require('../models');

module.exports = []
	.concat(require('./api/artists'))
	.concat(require('./api/albumReleases'))
	.concat(require('./api/bioSections'))
	.concat(require('./api/contactLists'))
	.concat(require('./api/embeddableMedias'))
	.concat(require('./api/files'))
	.concat(require('./api/mediaMentions'))
	.concat(require('./api/merchItems'))
	.concat(require('./api/origins'))
	.concat(require('./api/socialLinkLists'))
	.concat(require('./api/songs'))
	.concat(require('./api/users'));

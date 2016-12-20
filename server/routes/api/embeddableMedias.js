'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
    // Embeddable Medias
	{
        method: 'GET',
        path: '/api/embeddableMedias/{id}',
        handler: handlers.embeddableMedias.get,
        config: {
            tags: ['api'],
            description: 'Get one embeddableMedias by id',
            notes: 'Get one embeddableMedias by id',
			validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
	{
        method: 'GET',
        path: '/api/embeddableMedias',
        handler: handlers.embeddableMedias.getAll,
        config: {
            tags: ['api'],
            description: 'Get all embeddableMedias',
            notes: 'Get all embeddableMedias',
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'POST',
        path: '/api/embeddableMedias',
		handler: handlers.embeddableMedias.create,
        config: {
            tags: ['api'],
            description: 'Create a new embeddableMedia',
            notes: 'Create a new embeddableMedia',
            validate: {
                payload: {
					ArtistId: Joi.number().required(),
                    type: Joi.string().required(),
                    title: Joi.string().required(),
                    linkUrl: Joi.string().required(),
                    embedUrl: Joi.string().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
	{
        method: 'PUT',
        path: '/api/embeddableMedias/{id}',
		handler: handlers.embeddableMedias.update,
        config: {
            tags: ['api'],
            description: 'Update an Existing embeddableMedia',
            notes: 'Update an Existing embeddableMedia',
            validate: {
				params: {
					id: Joi.number().required()
				},
                payload: {
					type: Joi.string().required(),
					title: Joi.string().required(),
                    linkUrl: Joi.string().required(),
                    embedUrl: Joi.string().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
	{
        method: 'DELETE',
        path: '/api/embeddableMedias/{id}',
		handler: handlers.embeddableMedias.delete,
        config: {
            tags: ['api'],
            description: 'Delete an embeddableMedia by id',
            notes: 'Delete an embeddableMedia by id',
            validate: {
				params: {
					id: Joi.number().required()
				}
            },
            cors: {
                origin: ['*']
            }
        }
    },
];

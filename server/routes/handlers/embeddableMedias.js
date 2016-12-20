'use strict';

const models = require('../../models');
const Boom = require('boom');


// EmbeddableMedia Route Configs
let embeddableMedias = {
    get: (req, res) => {
        models.EmbeddableMedia.find({
                where: {
                    id: req.params.id
                }
            })
            .then((embeddableMedia) => {
                if (embeddableMedia) {
                    res(embeddableMedia).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.EmbeddableMedia.findAll(
			{
				limit: 50
			}
		)
        .then((embeddableMedias) => {
	    	res(embeddableMedias).code(200);
		});
    },
    create: (req, res) => {
		models.EmbeddableMedia.create({
				ArtistId: req.payload.ArtistId,
				type: req.payload.type,
				title: req.payload.title,
				linkUrl: req.payload.linkUrl,
				embedUrl: req.payload.embedUrl
            })
            .then((embeddableMedia) => {
				res(embeddableMedia).code(200);
			});
    },
    update: (req, res) => {
		models.EmbeddableMedia.find({
                where: {
                    id: req.params.id
                }
            }).then((embeddableMedia) => {
				embeddableMedia.updateAttributes({
					type: req.payload.type,
					title: req.payload.title,
					linkUrl: req.payload.linkUrl,
					embedUrl: req.payload.embedUrl
				}).then((embeddableMedia) => {
					res(embeddableMedia).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.EmbeddableMedia.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((embeddableMedia) => {
                if (embeddableMedia) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = embeddableMedias;

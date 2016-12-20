'use strict';

const models = require('../../models');
const Boom = require('boom');


// MediaMention Route Configs
let mediaMentions = {
    get: (req, res) => {
        models.MediaMention.find({
                where: {
                    id: req.params.id
                }
            })
            .then((mediaMention) => {
                if (mediaMention) {
                    res(mediaMention).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.MediaMention.findAll(
			{
				limit: 50
			}
		)
        .then((mediaMentions) => {
	    	res(mediaMentions).code(200);
		});
    },
    create: (req, res) => {
		models.MediaMention.create({
				author: req.payload.author,
				date: req.payload.date,
				linkUrl: req.payload.linkUrl,
				title: req.payload.title,
				text: req.payload.bookingManagerPhone
            })
            .then((mediaMention) => {
				res(mediaMention).code(200);
			});
    },
    update: (req, res) => {
		models.File.find({
                where: {
                    id: req.params.id
                }
            }).then((mediaMention) => {
				mediaMention.updateAttributes({
					author: req.payload.author,
					date: req.payload.date,
					linkUrl: req.payload.linkUrl,
					title: req.payload.title,
					text: req.payload.bookingManagerPhone
				}).then((mediaMention) => {
					res(mediaMention).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.MediaMention.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((mediaMention) => {
                if (mediaMention) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = mediaMentions;

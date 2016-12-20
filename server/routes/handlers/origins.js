'use strict';

const models = require('../../models');
const Boom = require('boom');


// Origin Route Configs
let origins = {
    get: (req, res) => {
        models.Origin.find({
                where: {
                    id: req.params.id
                }
            })
            .then((origin) => {
                if (origin) {
                    res(origin).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.Origin.findAll(
			{
				limit: 50
			}
		)
        .then((origins) => {
	    	res(origins).code(200);
		});
    },
    create: (req, res) => {
		models.Origin.create({
				ArtistId: req.payload.ArtistId,
				city: req.payload.city,
				stateProvince: req.payload.stateProvince,
				stateProviceCode: req.payload.stateProviceCode,
				country: req.payload.country,
				countryCode: req.payload.countryCode
            })
            .then((origin) => {
				res(origin).code(200);
			});
    },
    update: (req, res) => {
		models.File.find({
                where: {
                    id: req.params.id
                }
            }).then((origin) => {
				origin.updateAttributes({
					city: req.payload.city,
					stateProvince: req.payload.stateProvince,
					stateProviceCode: req.payload.stateProviceCode,
					country: req.payload.country,
					countryCode: req.payload.countryCode
				}).then((origin) => {
					res(origin).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.Origin.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((origin) => {
                if (origin) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = origins;

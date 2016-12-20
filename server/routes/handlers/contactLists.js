'use strict';

const models = require('../../models');
const Boom = require('boom');


// BioSection Route Configs
let bioSections = {
    get: (req, res) => {
        models.BioSection.find({
                where: {
                    id: req.params.id
                }
            })
            .then((bioSection) => {
                if (bioSection) {
                    res(bioSection).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.BioSection.findAll(
			{
				limit: 50
			}
		)
        .then((bioSections) => {
	    	res(bioSections).code(200);
		});
    },
    create: (req, res) => {
		models.BioSection.create({
				bandEmail: req.payload.bandEmail,
				bandPhone: req.payload.bandPhone,
				bandMailingAddress: req.payload.bandMailingAddress,
				bookingManagerEmail: req.payload.bookingManagerEmail,
				bookingManagerPhone: req.payload.bookingManagerPhone,
				generalManagerEmail: req.payload.generalManagerEmail,
				generalManagerPhone: req.payload.generalManagerPhone
            })
            .then((bioSection) => {
				res(bioSection).code(200);
			});
    },
    update: (req, res) => {
		models.File.find({
                where: {
                    id: req.params.id
                }
            }).then((bioSection) => {
				bioSection.updateAttributes({
					bandEmail: req.payload.bandEmail,
					bandPhone: req.payload.bandPhone,
					bandMailingAddress: req.payload.bandMailingAddress,
					bookingManagerEmail: req.payload.bookingManagerEmail,
					bookingManagerPhone: req.payload.bookingManagerPhone,
					generalManagerEmail: req.payload.generalManagerEmail,
					generalManagerPhone: req.payload.generalManagerPhone
				}).then((bioSection) => {
					res(bioSection).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.BioSection.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((bioSection) => {
                if (bioSection) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = bioSections;

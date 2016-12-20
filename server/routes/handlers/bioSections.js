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
				ArtistId: req.payload.ArtistId,
				content: req.payload.content,
				sourceName: req.payload.sourceName,
				sourceUrl: req.payload.sourceUrl
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
					content: req.payload.content,
					sourceName: req.payload.sourceName,
					sourceUrl: req.payload.sourceUrl
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

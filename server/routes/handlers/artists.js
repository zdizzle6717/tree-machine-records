'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');


// Artist Route Configs
let artists = {
    get: (req, res) => {
        models.Artist.find({
                where: {
                    param: req.params.param
                },
				include: [
					{
						model: models.AlbumRelease,
						include: [
							{
								model: models.File
							}
						]
					},
					{
						model: models.BioSection
					},
					{
						model: models.ContactList
					},
					{
						model: models.EmbeddableMedia
					},
					{
						model: models.File
					},
					{
						model: models.MediaMention
					},
					{
						model: models.MerchItem
					},
					{
						model: models.Origin
					},
					// {
					// 	model: models.FeaturedTrack
					// },
					{
						model: models.SocialLinkList
					}
				]
            })
            .then((artist) => {
                if (artist) {
                    res(artist).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.Artist.findAll(
			{
				order: 'name',
				limit: 50,
				include: [
					{
						model: models.File
					},
					{
						model: models.Origin
					}
				]
			}
		)
        .then((artists) => {
	    	res(artists).code(200);
		});
    },
    search: (req, res) => {
		let totalResults = 0;
		let totalPages = 0;
		let offset = 0;
        models.Artist.findAndCountAll()
		.then((allResults) => {
			totalResults = allResults.count;
			let totalPagesDecimal = totalResults === 0 ? 0 : (totalResults / req.payload.pageSize);
			totalPages = Math.ceil(totalPagesDecimal);
			offset = (req.payload.pageNumber - 1) * req.payload.pageSize;
			models.Artist.findAll({
				offset: offset,
				limit: req.payload.pageSize,
				include: [
					{
						model: models.File
					}
				]
			}).then((results) => {
		    	res({
					'pagination': {
						pageNumber: req.payload.pageNumber,
						pageSize: req.payload.pageSize,
						totalPages: totalPages,
						totalResults: totalResults
					},
					'results': results
				}).code(200);
			});
		})
    },
    create: (req, res) => {
		models.Artist.create({
				name: req.payload.name,
				param: req.payload.param,
				isCurrent: req.payload.isCurrent,
            })
			.then((artist) => {
				if (artist) {
					models.File.create({
						ArtistId: artist.id,
						identifier: req.payload.Files[0].identifier,
						name: req.payload.Files[0].name,
						size: req.payload.Files[0].size,
						type: req.payload.Files[0].type
					}).then((file) => {
						models.Artist.find({
				                where: {
				                    id: artist.id
				                },
								include: [
									{
										model: models.File
									}
								]
				            }).then((artist) => {
								res(artist).code(200);
							});
					});
				} else {
					res().code(406);
				}
            });
    },
	update: (req, res) => {
		models.Artist.find({
                where: {
                    id: req.params.id
                }
            }).then((artist) => {
				if (artist) {
					artist.updateAttributes({
						name: req.payload.name,
						param: req.payload.param,
						isCurrent: req.payload.isCurrent,
					}).then((artist) => {
						res(artist).code(200);
					})
				} else {
					res().code(404);
				}
			})
	},
    delete: (req, res) => {
        models.Artist.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((artist) => {
                if (artist) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = artists;

'use strict';

const sequelize = require('sequelize');
const models = require('../../models');
const fs = require('fs-extra');
const Boom = require('boom');


// AlbumRelease Route Configs
let albumReleases = {
    get: (req, res) => {
        models.AlbumRelease.find({
                where: {
                    param: req.params.param
                },
				include: [
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
						model: models.Artist
					}
				]
            })
            .then((albumRelease) => {
                if (albumRelease) {
                    res(albumRelease).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.AlbumRelease.findAll(
			{
				order: [['releaseDate', 'DESC']],
				include: [
					{
						model: models.File
					},
					{
						model: models.Artist
					}
				]
			}
		)
        .then((albumReleases) => {
	    	res(albumReleases).code(200);
		});
    },
    search: (req, res) => {
		let query = req.payload.searchQuery ? req.payload.searchQuery.toLowerCase() : '';
		let totalPages = 0;
		let offset = (req.payload.pageNumber - 1) * req.payload.pageSize;
		models.AlbumRelease.findAndCountAll({
			where: {
				$or: [
					{
					  summary: {
						$ilike: '%' + query + '%'
					  }
					},
					{
					  catalogueNumber: {
						$ilike: '%' + query + '%'
					  }
					},
					{
					  title: {
						$ilike: '%' + query + '%'
					  }
					}
				  ]
			},
			include: [
				{
					model: models.Artist
				},
				{
					model: models.File
				}
			],
			order: [['releaseDate', 'DESC']],
			offset: offset,
			limit: req.payload.pageSize
		}).then((response) => {
			let totalResults = response.count;
			let totalPagesDecimal = totalResults === 0 ? 0 : (totalResults / req.payload.pageSize);
			totalPages = Math.ceil(totalPagesDecimal);
			res({
				'pagination': {
					pageNumber: req.payload.pageNumber,
					pageSize: req.payload.pageSize,
					totalPages: totalPages,
					totalResults: response.rows.count
				},
				'results': response.rows
			}).code(200);
		});
    },
	getFeaturedAlbums: (req, res) => {
        models.FeaturedAlbumList.find(
			{
				where: {
					id: 1
				}
			}
		)
        .then((featuredAlbumList) => {
	    	models.AlbumRelease.findAll(
				{
					where: {
						$or: [{id: featuredAlbumList.albumReleaseIds}]
					},
					attributes: ['caption', 'releaseDate', 'id', 'param'],
					include: [
						{
							model: models.File,
							where: {
								identifier: 'albumCover'
							},
							attributes: ['name']
						},
						{
							model: models.Artist,
							attributes: ['param']
						}
					]
				}
			).then((albumReleases) => {
				if (albumReleases) {
					res(albumReleases).code(200);
				} else {
					res([]).code(200);
				}
			})
		});
    },
	setFeaturedAlbums: (req, res) => {
        models.FeaturedAlbumList.find(
			{
				where: {
					id: 1
				}
			}
		)
        .then((featuredAlbumList) => {
			if (featuredAlbumList) {
				featuredAlbumList.updateAttributes({
					albumReleaseIds: req.payload.albumReleaseIds
				}).then((featuredAlbumList) => {
					res(featuredAlbumList).code(200);
				})
			} else {
				models.FeaturedAlbumList.create({
					albumReleaseIds: req.payload.albumReleaseIds
				}).then((featuredAlbumList) => {
					res(featuredAlbumList).code(200);
				})
			}
		});
    },
    create: (req, res) => {
		models.AlbumRelease.create({
				ArtistId: req.payload.ArtistId,
				caption: req.payload.caption,
				catalogueNumber: req.payload.catalogueNumber,
				iTunesUrl: req.payload.iTunesUrl,
				param: req.payload.param,
				releaseDate: req.payload.releaseDate,
				spotifyUrl: req.payload.spotifyUrl,
				summary: req.payload.summary,
				title: req.payload.title
            })
            .then((albumRelease) => {
				if (albumRelease) {
					models.File.create({
						AlbumReleaseId: albumRelease.id,
						identifier: req.payload.Files[0].identifier,
						name: req.payload.Files[0].name,
						size: req.payload.Files[0].size,
						type: req.payload.Files[0].type
					}).then((file) => {
						models.AlbumRelease.find({
				                where: {
				                    id: albumRelease.id
				                },
								include: [
									{
										model: models.File
									}
								]
				            }).then((albumRelease) => {
								res(albumRelease).code(200);
							});
					});
				} else {
					res().code(406);
				}
            });
    },
    update: (req, res) => {
		models.File.find({
                where: {
                    AlbumReleaseId: req.params.id
                }
            }).then((file) => {
				file.updateAttributes({
					identifier: req.payload.Files[0].identifier,
					name: req.payload.Files[0].name,
					size: req.payload.Files[0].size,
					type: req.payload.Files[0].type
				}).then(() => {
					models.AlbumRelease.find({
			                where: {
			                    id: req.params.id
			                }
			            })
			            .then((albumRelease) => {
			                if (albumRelease) {
			                    albumRelease.updateAttributes({
									caption: req.payload.caption,
									catalogueNumber: req.payload.catalogueNumber,
									iTunesUrl: req.payload.iTunesUrl,
									param: req.payload.param,
									releaseDate: req.payload.releaseDate,
									spotifyUrl: req.payload.spotifyUrl,
									summary: req.payload.summary,
									title: req.payload.title
			                    }).then((response) => {
									models.AlbumRelease.find({
							                where: {
							                    id: response.id
							                },
											include: [
												{
													model: models.File
												}
											]
							            }).then((albumRelease) => {
											res(albumRelease).code(200);
										});
			                    }).catch(() => {
			                        res().code(406);
			                    });
			                }
			                else {
			                    res().code(404);
			                }
			            });
				})
			})
	},
    delete: (req, res) => {
        models.AlbumRelease.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((albumRelease) => {
                if (albumRelease) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = albumReleases;

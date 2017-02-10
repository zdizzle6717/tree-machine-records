'use strict';

const models = require('../../models');
const Boom = require('boom');


// Song Route Configs
let songs = {
    get: (req, res) => {
        models.Song.find({
                where: {
                    id: req.params.id
                },
				include: [
					{
						model: models.AlbumRelease,
						attributes: ['title', 'param'],
						include: [
							{
								model: models.Artist,
								attributes: ['name', 'param']
							}
						]
					},
					{
						model: models.File
					},
				]
            })
            .then((song) => {
                if (song) {
                    res(song).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.Song.findAll(
			{
				limit: 50,
				include: [
					{
						model: models.AlbumRelease,
						attributes: ['title', 'param'],
						include: [
							{
								model: models.Artist,
								attributes: ['name', 'param']
							}
						]
					},
					{
						model: models.File
					},
				]
			},

		)
        .then((songs) => {
	    	res(songs).code(200);
		});
    },
	getFeaturedSongs: (req, res) => {
        models.FeaturedSongList.find(
			{
				where: {
					id: 1
				}
			}
		)
        .then((featuredSongList) => {
	    	models.Song.findAll(
				{
					where: {
						$or: [{id: featuredSongList.songIds}]
					},
					order: 'id',
					include: [
						{
							model: models.AlbumRelease,
							attributes: ['title', 'param'],
							include: [
								{
									model: models.Artist,
									attributes: ['name', 'param']
								}
							]
						},
						{
							model: models.File
						},
					]
				}
			).then((songs) => {
				if (songs) {
					res(songs).code(200);
				} else {
					res([]).code(200);
				}
			})
		});
    },
	setFeaturedSongs: (req, res) => {
        models.FeaturedSongList.find(
			{
				where: {
					id: 1
				}
			}
		)
        .then((featuredSongList) => {
			if (featuredSongList) {
				featuredSongList.updateAttributes({
					songIds: req.payload.songIds
				}).then((featuredSongList) => {
					res(featuredSongList).code(200);
				})
			} else {
				models.FeaturedSongList.create({
					songIds: req.payload.songIds
				}).then((featuredSongList) => {
					res(featuredSongList).code(200);
				})
			}
		});
    },
    create: (req, res) => {
		models.Song.create({
				AlbumReleaseId: req.payload.AlbumReleaseId,
				title: req.payload.title,
				fileName: req.payload.fileName
            })
            .then((song) => {
				if (song) {
					models.File.create({
						SongId: song.id,
						identifier: req.payload.File.identifier,
						name: req.payload.File.name,
						size: req.payload.File.size,
						type: req.payload.File.type
					}).then((file) => {
						models.Song.find({
				                where: {
				                    id: song.id
				                },
								include: [
									{
										model: models.AlbumRelease,
										attributes: ['title', 'param'],
										include: [
											{
												model: models.Artist,
												attributes: ['name', 'param']
											}
										]
									},
									{
										model: models.File
									},
								]
				            }).then((song) => {
								res(song).code(200);
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
                    id: req.params.id
                }
            }).then((song) => {
				song.updateAttributes({
					title: req.payload.title,
					fileName: req.payload.fileName
				}).then((song) => {
					res(song).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.Song.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((song) => {
                if (song) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = songs;

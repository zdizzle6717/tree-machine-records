'use strict';

const models = require('../../models');
const Boom = require('boom');


// SocialLinkList Route Configs
let socialLinkLists = {
    get: (req, res) => {
        models.SocialLinkList.find({
                where: {
                    id: req.params.id
                }
            })
            .then((socialLinkList) => {
                if (socialLinkList) {
                    res(socialLinkList).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.SocialLinkList.findAll(
			{
				limit: 50
			}
		)
        .then((socialLinkLists) => {
	    	res(socialLinkLists).code(200);
		});
    },
    create: (req, res) => {
		models.SocialLinkList.create({
				ArtistId: req.payload.ArtistId,
				facebookUrl: req.payload.facebookUrl,
				twitterUrl: req.payload.twitterUrl,
				instagramUrl: req.payload.instagramUrl,
				soundcloudUrl: req.payload.soundcloudUrl,
				bandcampUrl: req.payload.bandcampUrl,
				homepageUrl: req.payload.homepageUrl,
				tumblrUrl: req.payload.tumblrUrl,
				spotifyUrl: req.payload.spotifyUrl,
				youtubeUrl: req.payload.youtubeUrl,
				displayFlag: req.payload.displayFlag
            })
            .then((socialLinkList) => {
				res(socialLinkList).code(200);
			});
    },
    update: (req, res) => {
		models.SocialLinkList.find({
                where: {
                    id: req.params.id
                }
            }).then((socialLinkList) => {
				socialLinkList.updateAttributes({
					facebookUrl: req.payload.facebookUrl,
					twitterUrl: req.payload.twitterUrl,
					instagramUrl: req.payload.instagramUrl,
					soundcloudUrl: req.payload.soundcloudUrl,
					bandcampUrl: req.payload.bandcampUrl,
					homepageUrl: req.payload.homepageUrl,
					tumblrUrl: req.payload.tumblrUrl,
					spotifyUrl: req.payload.spotifyUrl,
					youtubeUrl: req.payload.youtubeUrl,
					displayFlag: req.payload.displayFlag
				}).then((socialLinkList) => {
					res(socialLinkList).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.SocialLinkList.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((socialLinkList) => {
                if (socialLinkList) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = socialLinkLists;

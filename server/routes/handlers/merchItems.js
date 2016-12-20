'use strict';

const models = require('../../models');
const Boom = require('boom');


// MerchItem Route Configs
let merchItems = {
    get: (req, res) => {
        models.MerchItem.find({
                where: {
                    id: req.params.id
                }
            })
            .then((merchItem) => {
                if (merchItem) {
                    res(merchItem).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: (req, res) => {
        models.MerchItem.findAll(
			{
				limit: 50
			}
		)
        .then((merchItems) => {
	    	res(merchItems).code(200);
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
		models.MerchItem.create({
				title: req.payload.title,
				price: req.payload.price,
				shortDescription: req.payload.shortDescription,
				description: req.payload.description,
				sku: req.payload.sku,
				qty: req.payload.qty,
				format: req.payload.format,
				isDisplayed: req.payload.isDisplayed,
				isFeatured: req.payload.isFeatured
            })
            .then((merchItem) => {
				res(merchItem).code(200);
			});
    },
    update: (req, res) => {
		models.File.find({
                where: {
                    id: req.params.id
                }
            }).then((merchItem) => {
				merchItem.updateAttributes({
					title: req.payload.title,
					price: req.payload.price,
					shortDescription: req.payload.shortDescription,
					description: req.payload.description,
					sku: req.payload.sku,
					qty: req.payload.qty,
					format: req.payload.format,
					isDisplayed: req.payload.isDisplayed,
					isFeatured: req.payload.isFeatured
				}).then((merchItem) => {
					res(merchItem).code(200);
				})
			})
	},
    delete: (req, res) => {
        models.MerchItem.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((merchItem) => {
                if (merchItem) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};

module.exports = merchItems;

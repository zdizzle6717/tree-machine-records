'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');
const createToken = require('../../utils/createToken');
const userFunctions = require('../../utils/userFunctions');

// App users
let users = {
	create: (req, res) => {
		userFunctions.hashPassword(req.payload.password, (err, hash) => {
			let siteAdmin = req.payload.role === 'siteAdmin' ? true : false;
			let artist = req.payload.role === 'artist' ? true : false;
			let subscriber = req.payload.role === 'subscriber' ? true : false;
			models.User.create({
	                email: req.payload.email,
	                username: req.payload.username,
					password: hash,
					siteAdmin: siteAdmin,
					artist: artist,
					subscriber: subscriber
	            })
				.then((user) => {
					res({
						id: user.id,
						email: user.email,
						username: user.username,
						roleFlags: userFunctions.getUserRoleFlags(user),
						id_token: createToken(user)
					}).code(201);
				})
				.catch((response) => {
					throw Boom.badRequest(response);
				})
		});
	},
	authenticate: (req, res) => {
		res({
			id: req.pre.user.id,
			email: req.pre.user.email,
			username: req.pre.user.username,
			roleFlags: userFunctions.getUserRoleFlags(req.pre.user),
			id_token: createToken(req.pre.user)
		}).code(201);
	},
	getAll: (req, res) => {
		models.User.findAll({
			attributes: ['username', 'email', 'createdAt'],
			limit: 50,
			order: '"updatedAt" DESC'
		})
		.then((users) => {
			res(users).code(200);
		});
	}
}

module.exports = users;

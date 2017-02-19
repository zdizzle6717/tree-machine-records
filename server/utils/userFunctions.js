'use strict';

const Boom = require('boom');
const bcrypt = require('bcryptjs');
const models = require('../models');
const roleConfig = require('../../roleConfig');

function verifyUniqueUser(req, res) {
    models.User.find({
            where: {
                $or: [{
                    email: req.payload.email
                }, {
                    username: req.payload.username
                }]
            }
        })
        .then((user) => {
            if (user) {
                if (user.username === req.payload.username) {
                    res(Boom.badRequest('Username taken'));
                }
                if (user.email === req.payload.email) {
                    res(Boom.badRequest('Email taken'));
                }
            }

            res(req.payload);
        })
        .catch((response) => {
            console.log(response);
        });
}

function hashPassword(password, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
            return cb(err, hash)
        });
    });
}

function verifyCredentials(req, res) {
    const password = req.payload.password;

    models.User.find({
            where: {
                $or: [{
                    email: req.payload.username
                }, {
                    username: req.payload.username
                }]
            }
        })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (isValid) {
                        res(user);
                    } else {
                        res(Boom.badRequest('Incorrect password!'));
                    }
                });
            } else {
                res(Boom.badRequest('Incorrect username or email!'));
            }
        })
        .catch((response) => {
            console.log(response);
        });
}

function getUserRoleFlags(user) {
	let userRoleFlags = 0;
	roleConfig.forEach((role) => {
		if (user[role.name]) {
			userRoleFlags += role.roleFlags;
		}
	});

	return userRoleFlags;
}

module.exports = {
    verifyUniqueUser,
    verifyCredentials,
    hashPassword,
	getUserRoleFlags
}

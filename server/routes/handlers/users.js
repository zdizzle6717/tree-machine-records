'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../../envVariables.js');
const Boom = require('boom');
const createToken = require('../../utils/createToken');
const userFunctions = require('../../utils/userFunctions');
const nodemailer = require('nodemailer');
const generator = require('xoauth2').createXOAuth2Generator(env.email.XOAuth2);
const buildRegistrationEmail = require('../../emailTemplates/registrationSuccess');

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token) {});

let transporter = nodemailer.createTransport(({
  service: 'Gmail',
  auth: {
    xoauth2: generator
  }
}));

// App users
let users = {
  create: (req, res) => {
    userFunctions.hashPassword(req.payload.password, (err, hash) => {
      models.User.create({
          email: req.payload.email,
          username: req.payload.username,
          password: hash,
          [request.payload.role]: true
        })
        .then((user) => {
          let customerMailConfig = {
            from: env.email.user,
            to: user.email,
            subject: `Welcome to Tree Machine Records!`,
            html: buildRegistrationEmail(user)
          };

          transporter.sendMail(customerMailConfig, function(error, info) {
            if (error) {
              console.log(error);
              reply('Somthing went wrong');
            } else {
              res({
                id: user.id,
                email: user.email,
                username: user.username,
                roleFlags: userFunctions.getUserRoleFlags(user),
                id_token: createToken(user)
              }).code(201);
            };
          });
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

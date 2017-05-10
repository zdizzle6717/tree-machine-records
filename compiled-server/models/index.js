'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _envVariables = require('../../envVariables');

var _envVariables2 = _interopRequireDefault(_envVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConfig = _envVariables2.default.dbConfig;
var basename = _path2.default.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = dbConfig[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new _sequelize2.default(process.env[config.use_env_variable]);
} else {
  var sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
}

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

module.exports = db;
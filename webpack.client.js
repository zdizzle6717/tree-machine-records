'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  'entry': path.join(__dirname, 'server-client', 'index.jsx'),
  'output': {
    'path': path.join(__dirname, 'server-client'),
    'filename': 'compiled.js'
  },
	'node': {
		'__dirname': true,
	},
	'target': 'node',
	'externals': nodeModules,
  'module': {
    'rules': [{
			'test': /\.jsx?$/,
			'exclude': /(node_modules)/,
			'loaders': ['babel-loader']
      },
			{
				'include': /\.json$/,
				'loaders': ['json-loader']
			}]
  },
  'resolve': {
    'extensions': ['.json', '.jsx', '.js']
  },
	'plugins': [
		new webpack.BannerPlugin({
			'banner': 'require("source-map-support").install();',
			'raw': true,
			'entryOnly': false
		})
	],
	'devtool': 'sourcemap'
};

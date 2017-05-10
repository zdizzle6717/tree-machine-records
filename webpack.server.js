'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// TODO: Work out the kinks

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  'entry': path.join(__dirname, 'server', 'index.js'),
  'output': {
    'path': path.join(__dirname, 'server'),
    'filename': 'compiled.js'
  },
	'node': {
		'__dirname': true,
		'__filename': true
	},
	'target': 'node',
	'externals': nodeModules,
  'module': {
    'rules': [{
			'test': /\.js?$/,
			'exclude': /(node_modules)/,
			'loaders': ['babel-loader']
      },
			{
				'include': /\.json$/,
				'loaders': ['json-loader']
			}]
  },
  'resolve': {
    'extensions': ['.json', '.js']
  },
	'plugins': [
		new webpack.BannerPlugin({
			'banner': `require('source-map-support').install();`,
			'raw': true,
			'entryOnly': false
		})
	],
	'devtool': 'sourcemap'
};

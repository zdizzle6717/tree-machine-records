'use strict';

module.exports = [
	{
		'name': 'public',
		'roleFlags': 0,
		'homeState': 'home',
	},
	{
		'name': 'siteAdmin',
		'roleFlags': 1,
		'homeState': '/',
	},
	{
		'name': 'artist',
		'roleFlags': 2,
		'homeState': '/artists',
	},
	{
		'name': 'subscriber',
		'roleFlags': 4,
		'homeState': '/',
	},
];

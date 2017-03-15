'use strict';

module.exports = [
	{
		'name': 'public',
		'roleFlags': 0,
		'homeState': '/',
	},
	{
		'name': 'subscriber',
		'roleFlags': 1,
		'homeState': '/profile',
	},
	{
		'name': 'artist',
		'roleFlags': 2,
		'homeState': '/profile',
	},
	{
		'name': 'recordStore',
		'roleFlags': 4,
		'homeState': '/profile',
	},
	{
		'name': 'recordLabel',
		'roleFlags': 12,
		'homeState': '/profile',
	},
	{
		'name': 'siteAdmin',
		'roleFlags': 15,
		'homeState': '/admin',
	}
];

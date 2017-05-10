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
		'homeState': '/dashboard',
	},
	{
		'name': 'artist',
		'roleFlags': 2,
		'homeState': '/dashboard',
	},
	{
		'name': 'recordStore',
		'roleFlags': 4,
		'homeState': '/dashboard',
	},
	{
		'name': 'recordLabel',
		'roleFlags': 12,
		'homeState': '/dashboard',
	},
	{
		'name': 'siteAdmin',
		'roleFlags': 31,
		'homeState': '/admin',
	}
];

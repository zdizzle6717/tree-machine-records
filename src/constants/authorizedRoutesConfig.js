'use strict';

module.exports = [
	{
		'name': 'admin',
		'path': '/admin**',
		'accessControl': ['sytemAdmin']
	},
	{
		'name': 'artistDigitalDownloads',
		'path': '/artists/*/digital-downloads',
		'accessControl': ['sytemAdmin']
	},
	{
		'name': 'digitalDownloads',
		'path': '/digital-downloads',
		'accessControl': ['subscriber']
	},
	{
		'name': 'editDiscography',
		'path': '/edit-discography**',
		'accessControl': ['siteAdmin']
	},
	{
		'name': 'profile',
		'path': '/profile',
		'accessControl': ['subscriber']
	}
];

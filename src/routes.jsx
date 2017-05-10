'use strict';

import Home from './components/pages/Home';
	import Dashboard from './components/pages/dashboard/Dashboard';
		import EditAlbumRelease from './components/pages/admin/EditAlbumRelease';
		import EditBioSection from './components/pages/admin/EditBioSection';
		import EditContactList from './components/pages/admin/EditContactList';
		import EditDigitalDownload from './components/pages/admin/EditDigitalDownload';
		import EditEmbeddableMedia from './components/pages/admin/EditEmbeddableMedia';
		import EditMediaMention from './components/pages/admin/EditMediaMention';
		import EditMerchItem from './components/pages/admin/EditMerchItem';
		import EditOrigin from './components/pages/admin/EditOrigin';
		import EditSocialLinkList from './components/pages/admin/EditSocialLinkList';
		import EditSong from './components/pages/admin/EditSong';
import About from './components/pages/About';
import Archive from './components/pages/Archive';
import ArtistList from './components/pages/artist/ArtistList';
	import ArtistCinematography from './components/pages/artist/ArtistCinematography';
	import ArtistDigitalDownloads from './components/pages/artist/ArtistDigitalDownloads';
	import Artist from './components/pages/artist/Artist';
	import ArtistPhotography from './components/pages/artist/ArtistPhotography';
import CinematographyList from './components/pages/CinematographyList';
import Country from './components/pages/Country';
import CountryList from './components/pages/CountryList';
import Discography from './components/pages/Discography';
import DiscographyList from './components/pages/DiscographyList';
import DownloadList from './components/pages/DownloadList';
import Login from './components/pages/Login';
import PhotographyList from './components/pages/PhotographyList';
import Playlist from './components/pages/Playlist';
import Register from './components/pages/Register';
import Search from './components/pages/Search';
import SiteMap from './components/pages/SiteMap';
import Store from './components/pages/store/Store';
	import Cart from './components/pages/store/Cart';
	import Checkout from './components/pages/store/Checkout';
	import OrderSuccess from './components/pages/store/OrderSuccess';
import NotFound from './components/pages/NotFound';


let routes = [
	// Index/Home
	{
		'path': '/',
		'component': Home,
		'exact': true
	},

	// Public pages...
	{
		'path': '/about',
		'component': About,
		'exact': true
	},
	{
		'path': '/archive',
		'component': Archive,
		'exact': true
	},
	{
		'path': '/cinematography',
		'component': CinematographyList,
		'exact': true
	},
	{
		'path': '/discography',
		'component': DiscographyList,
		'exact': true
	},
	{
		'path': '/digital-downloads',
		'component': DownloadList,
		'exact': true
	},
	{
		'path': '/login',
		'component': Login,
		'exact': true
	},
	{
		'path': '/photography',
		'component': PhotographyList,
		'exact': true
	},
	{
		'path': '/playlist',
		'component': Playlist,
		'exact': true
	},
	{
		'path': '/register',
		'component': Register,
		'exact': true
	},
	{
		'path': '/search',
		'component': Search,
		'exact': true
	},
	{
		'path': '/site-map',
		'component': SiteMap,
		'exact': true
	},


	// Artists
	{
		'path': '/artists',
		'component': ArtistList,
		'exact': true
	},
	{
		'path': '/artists/:artistParam',
		'component': Artist,
		'exact': true,
		'strict': true,
	},
	{
		'path': '/artists/:artistParam/cinematography',
		'component': ArtistCinematography,
		'exact': true
	},
	{
		'path': '/artists/:artistParam/discography/:discographyParam',
		'component': Discography,
		'exact': true
	},
	{
		'path': '/artists/:artistParam/digital-downloads',
		'component': ArtistDigitalDownloads,
		'exact': true
	},
	{
		'path': '/artists/:artistParam/photography',
		'component': ArtistPhotography,
		'exact': true
	},


	// Admin
	{
		'path': '/admin',
		'component': Dashboard,
		'exact': true
	},
	{
		'path': '/profile',
		'component': Dashboard,
		'exact': true
	},
	{
		'path': '/bio-section/create',
		'component': EditBioSection,
		'exact': true
	},
	{
		'path': '/bio-section/edit/:bioSectionId',
		'component': EditBioSection
	},
	{
		'path': '/contact-list/create',
		'component': EditContactList,
		'exact': true
	},
	{
		'path': '/contact-list/edit/:contactListId',
		'component': EditContactList
	},
	{
		'path': '/discography/create',
		'component': EditAlbumRelease,
		'exact': true
	},
	{
		'path': '/discography/edit/:albumReleaseId',
		'component': EditAlbumRelease
	},
	{
		'path': '/digital-download/create',
		'component': EditDigitalDownload,
		'exact': true
	},
	{
		'path': '/digital-download/edit/:contactListId',
		'component': EditDigitalDownload
	},
	{
		'path': '/digital-download/create',
		'component': EditAlbumRelease,
		'exact': true
	},
	{
		'path': '/digital-download/edit/:discographyParam',
		'component': EditAlbumRelease
	},
	{
		'path': '/embeddable-media/create',
		'component': EditEmbeddableMedia,
		'exact': true
	},
	{
		'path': '/embeddable-media/edit/:embeddableMediaId',
		'component': EditEmbeddableMedia
	},
	{
		'path': '/media-mention/create',
		'component': EditMediaMention,
		'exact': true
	},
	{
		'path': '/media-mention/edit/:mediaMentionId',
		'component': EditMediaMention
	},
	{
		'path': '/merch-item/create',
		'component': EditMerchItem,
		'exact': true
	},
	{
		'path': '/merch-item/edit/:merchId',
		'component': EditMerchItem
	},
	{
		'path': '/origin/create',
		'component': EditOrigin,
		'exact': true
	},
	{
		'path': '/origin/edit/:originId',
		'component': EditOrigin
	},
	{
		'path': '/social-link-list/create',
		'component': EditSocialLinkList,
		'exact': true
	},
	{
		'path': '/social-link-list/edit/:socialLinkListId',
		'component': EditSocialLinkList
	},
	{
		'path': '/song/create',
		'component': EditSong,
		'exact': true
	},
	{
		'path': '/song/edit/:songId',
		'component': EditSong
	},

	// Countries
	{
		'path': '/countries',
		'component': CountryList,
		'exact': true
	},
	{
		'path': '/countries/:countryCode',
		'component': Country
	},

	// Store
	{
		'path': '/store',
		'component': Store,
		'exact': true
	},
	{
		'path': '/store/cart',
		'component': Cart
	},
	{
		'path': '/store/checkout',
		'component': Checkout
	},
	{
		'path': '/store/order-success',
		'component': OrderSuccess
	},

	// If no route matches, return NotFound component
	{
		'component': NotFound
	}
];

export default routes;

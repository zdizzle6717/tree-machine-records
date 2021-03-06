import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';

// Main Pages
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AboutPage from './components/pages/AboutPage';
import ArchivePage from './components/pages/ArchivePage';
import CinematographyListPage from './components/pages/CinematographyListPage';
import CountryPage from './components/pages/CountryPage';
import DiscographyListPage from './components/pages/DiscographyListPage';
import DiscographyPage from './components/pages/DiscographyPage';
import DownloadListPage from './components/pages/DownloadListPage';
import CountryListPage from './components/pages/CountryListPage';
import PhotographyListPage from './components/pages/PhotographyListPage';
import PlaylistPage from './components/pages/PlaylistPage';
import SearchPage from './components/pages/SearchPage';
import SiteMapPage from './components/pages/SiteMapPage';

// Admin Pages
import EditAlbumReleasePage from './components/pages/admin/EditAlbumReleasePage';
import EditBioSectionPage from './components/pages/admin/EditBioSectionPage';
import EditContactListPage from './components/pages/admin/EditContactListPage';
import EditDigitalDownloadPage from './components/pages/admin/EditDigitalDownloadPage';
import EditEmbeddableMediaPage from './components/pages/admin/EditEmbeddableMediaPage';
import EditMediaMentionPage from './components/pages/admin/EditMediaMentionPage';
import EditMerchItemPage from './components/pages/admin/EditMerchItemPage';
import EditOriginPage from './components/pages/admin/EditOriginPage';
import EditSocialLinkListPage from './components/pages/admin/EditSocialLinkListPage';
import EditSongPage from './components/pages/admin/EditSongPage';

// Artist Pages
import ArtistCinematographyPage from './components/pages/artist/ArtistCinematographyPage';
import ArtistDigitalDownloadsPage from './components/pages/artist/ArtistDigitalDownloadsPage';
import ArtistListPage from './components/pages/artist/ArtistListPage';
import ArtistPage from './components/pages/artist/ArtistPage';
import ArtistPhotographyPage from './components/pages/artist/ArtistPhotographyPage';

// Profile Pages
import ProfilePage from './components/pages/profile/ProfilePage';

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={IndexPage}/>
		<Route path="about" component={AboutPage}/>
		<Route path="admin">
			<IndexRoute component={ProfilePage}/>
			<Route path="bio-section/create" component={EditBioSectionPage}/>
			<Route path="bio-section/edit/:bioSectionId" component={EditBioSectionPage}/>
			<Route path="contact-list/create" component={EditContactListPage}/>
			<Route path="contact-list/edit/:contactListId" component={EditContactListPage}/>
			<Route path="digital-download/create" component={EditDigitalDownloadPage}/>
			<Route path="digital-download/edit/:digitalDownloadId" component={EditDigitalDownloadPage}/>
			<Route path="discography/create" component={EditAlbumReleasePage}/>
			<Route path="discography/edit/:discographyParam" component={EditAlbumReleasePage}/>
			<Route path="embeddable-media/create" component={EditEmbeddableMediaPage}/>
			<Route path="embeddable-media/edit/:embeddableMediaId" component={EditEmbeddableMediaPage}/>
			<Route path="media-mention/create" component={EditMediaMentionPage}/>
			<Route path="media-mention/edit/:mediaMentionId" component={EditMediaMentionPage}/>
			<Route path="merch/create" component={EditMerchItemPage}/>
			<Route path="merch/edit/:merchId" component={EditMerchItemPage}/>
			<Route path="origin/create" component={EditOriginPage}/>
			<Route path="origin/edit/:originId" component={EditOriginPage}/>
			<Route path="social-link-list/create" component={EditSocialLinkListPage}/>
			<Route path="social-link-list/edit/:socialLinkListId" component={EditSocialLinkListPage}/>
			<Route path="song/create" component={EditSongPage}/>
			<Route path="song/edit/:songId" component={EditSongPage}/>
		</Route>
		<Route path="archive" component={ArchivePage}/>
		<Route path="artists">
			<IndexRoute component={ArtistListPage}/>
			<Route path=":artistParam" component={ArtistPage}/>
			<Route path=":artistParam/cinematography" component={ArtistCinematographyPage}/>
			<Route path=":artistParam/discography/:discographyParam" component={DiscographyPage}/>
			<Route path=":artistParam/digital-downloads" component={ArtistDigitalDownloadsPage}/>
			<Route path=":artistParam/photography" component={ArtistPhotographyPage}/>
		</Route>
		<Route path="cinematography" component={CinematographyListPage}/>
		<Route path="discography" component={DiscographyListPage}/>
		<Route path="digital-downloads" component={DownloadListPage}/>
		<Route path="login" component={LoginPage}/>
		<Route path="countries">
			<IndexRoute component={CountryListPage}/>
			<Route path=":countryCode" component={CountryPage}/>
		</Route>
		<Route path="photography" component={PhotographyListPage}/>
		<Route path="playlist" component={PlaylistPage}/>
		<Route path="profile">
			<IndexRoute component={ProfilePage}/>
		</Route>
		<Route path="register" component={RegistrationPage}/>
		<Route path="search" component={SearchPage}/>
		<Route path="site-map" component={SiteMapPage}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);

export default routes;

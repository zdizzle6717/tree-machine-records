'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.useApplyAsync(true);

    $stateProvider
        .state({
            name: 'landing',
            url: '/',
            controller: 'LandingPageController as Landing',
            template: require('./views/landing.html')
        })
        .state({
            name: 'home',
            url: '/home',
            controller: 'HomePageController as Home',
            template: require('./views/home.html')
        })
        .state({
            name: 'archive',
            url: '/archive',
            controller: 'HomePageController as Home',
            template: require('./views/archive.html')
        })
        .state({
            name: 'siteMap',
            url: '/site-map',
            controller: 'HomePageController as Home',
            template: require('./views/siteMap.html')
        })
        .state({
            name: 'about',
            url: '/about',
            controller: 'HomePageController as Home',
            template: require('./views/about.html')
        })

        // Artists
        .state({
            name: 'artists',
            url: '/artists',
            controller: 'ArtistsController as Artists',
            template: require('./views/currentArtists.html')
        })
        .state({
            name: 'artist',
            url: '/artists/{artistParam}',
            controller: 'ArtistProfileController as Artist',
            template: require('./views/artist.html')
        })
        .state({
            name: 'previousArtists',
            url: '/previous-artists',
            controller: 'ArtistsController as Artists',
            template: require('./views/previousArtists.html')
        })

        // Discography
        .state({
            name: 'discography',
            url: '/discography',
            controller: 'DiscographyController as Disc',
            template: require('./views/discography.html')
        })
        .state({
            name: 'singleDiscography',
            url: '/{artistParam}/{discParam}',
            controller: 'DiscographyController as Disc',
            template: require('./views/singleDiscography.html')
        })
        .state({
            name: 'map',
            url: '/map',
            controller: 'MapController as Map',
            template: require('./views/map.html')
        })
        .state({
            name: 'mapSelect',
            url: '/map/country/{countryParam}',
            controller: 'MapController as Map',
            template: require('./views/mapSelect.html')
        })

        // Left Menu
        .state({
            name: 'search',
            url: '/search',
            controller: 'SearchController as Search',
            template: require('./views/search.html')
        })
        .state({
            name: 'music',
            url: '/music',
            controller: 'HomePageController as Home',
            template: require('./views/music.html')
        })
        .state({
            name: 'photos',
            url: '/photos',
            controller: 'ArtistsController as Artists',
            template: require('./views/photos.html')
        })
        .state({
            name: 'media',
            url: '/media',
            controller: 'ArtistsController as Artists',
            template: require('./views/videos.html')
        })
        .state({
            name: 'artistPhotos',
            url: '/artists/{artistParam}/photos',
            controller: 'ArtistsController as Artists',
            template: require('./views/artistPhotos.html')
        })
        .state({
            name: 'artistMedia',
            url: '/artists/{artistParam}/media',
            controller: 'ArtistsController as Artists',
            template: require('./views/artistVideos.html')
        })
        .state({
            name: 'digitialDownloads',
            url: '/digitialDownloads',
            controller: 'ArtistsController as Artists',
            template: require('./views/downloads.html')
        })
        .state({
            name: 'artistDownloads',
            url: '/artists/{artistParam}/downloads',
            controller: 'ArtistsController as Artists',
            template: require('./views/artistDownloads.html')
        })


        // Store
        // .state({
        //     name: 'recordStore',
        //     url: '/records',
        //     controller: 'HomePageController as Home',
        //     template: require('./views/recordStore.html')
        // })

        ;

    $urlRouterProvider.otherwise('/');
}

module.exports = config;

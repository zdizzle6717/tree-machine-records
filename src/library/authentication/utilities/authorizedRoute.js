'use strict';

const authorizedRoute = (authorizedRoutesConfig, destination) => {
	let foundRoute;

	function findRoute(routesConfig) {
		routesConfig.forEach((route) => {
			// Check for parent match
			if (destination.includes(route.path)) {
				if (destination === route.path) {
					return foundRoute = route;
				} else if (route.hasOwnProperty('children')) {
					return findRoute(route.children);
				}
				// Check for parent route
			} else if (route.path.slice(-2) === '**' && destination.includes(route.path.substring(0, route.path.length - 2))) {
				return foundRoute = route;
				// Check for route with params
			} else if (route.path.includes('*')) {
				return matchToParams(route, destination);
			}
		});

		return foundRoute;
	}

	// Check for route with respective matching params
	function matchToParams(route, destPath) {
		let destArray = destPath.split('/');
		let routeArray = route.path.split('/');
		let routeParamIndexes = getAllIndexes(routeArray, '*');
		destArray = replaceParams(destArray, routeParamIndexes, '*');
		let routePath = routeArray.join('/');
		destPath = destArray.join('/');
		// TODO: Test that route with params and wild card works
		if (routePath.slice(-2) === '**') {
			if (destPath.includes(routePath.substring(0, routePath.length - 2))) {
				foundRoute = route;
			}
		} else if (destPath === routePath) {
			foundRoute = route;
		}
	}

	function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        indexes.push(i);
			}
		}
    return indexes;
	}

	function replaceParams(arr, indexes, symbol = '*') {
		indexes.forEach((index) => {
			arr[index] = symbol;
		});
		return arr;
	}

	return findRoute(authorizedRoutesConfig);

};



export default authorizedRoute;

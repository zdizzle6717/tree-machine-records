'use strict';

export default function(prop) {
	return prop.charAt(0).toUpperCase() + prop.substr(1).replace(/[A-Z]/g, ' $&');
}

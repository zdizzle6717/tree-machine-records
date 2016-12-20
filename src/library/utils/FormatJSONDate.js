'use strict';

import dateFormat from 'dateformat';

const formatDate = (input) => {
	let output = new Date(input);
	output = dateFormat(output, 'd mmm yyyy');
	// let output = new Date(dateString);
	return output;
}

export default formatDate;

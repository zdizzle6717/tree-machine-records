'use strict';

import moment from 'moment-timezone';

const formatDate = (input) => {
	// Since the database stores dates as GMT, this will account for that conversion
	let output = moment.tz(input, "Etc/GMT").format('D MMM YYYY');
	return output;
}

export default formatDate;

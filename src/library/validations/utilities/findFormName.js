'use strict';

const findFormName = (element) => {
	let parent = element.parentElement;
	if (!parent || parent.tagName === 'HTML') {
		return undefined;
	}
	if (parent.tagName !== 'FORM') {
		return findFormName(parent);
	} else {
		return parent.getAttribute('name');
	}
};

export default findFormName;

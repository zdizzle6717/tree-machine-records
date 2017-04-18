'use strict';

// TODO: This should check for any of the flags, not all

const checkAuthorization = (accessControl, user, roleConfig) => {
	let userFlags = user.roleFlags || 0;

	const hasFlags = (flags, mask) => {
		flags = parseInt(flags, 10);
		mask = parseInt(mask, 10);

		return (flags & mask) === mask;
	};

	return accessControl.some((accessLevel) => {
		return roleConfig.some((role) => {
			if (role.name === accessLevel) {
				return hasFlags(userFlags, role.roleFlags);
			}
		});
	});

};

export default checkAuthorization;

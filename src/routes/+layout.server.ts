import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const user = locals.user ? JSON.parse(JSON.stringify(locals.user)) : false;

	return {
		user
	};
};

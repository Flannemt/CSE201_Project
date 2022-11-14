import { GetUserData } from '$db/database';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const user = await GetUserData(locals.user.uuid);

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	return {
		threads: user.threads,
		friends: user.friends
	};
};

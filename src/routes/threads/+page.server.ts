import { CreateThread, GetUserData } from '$db/database';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const user = await GetUserData(locals.user.uuid);

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	return {
		threads: user.threads
	};
};

export const actions: Actions = {
	create: async ({ locals }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		// const data = await request.formData();
		// const name = data.get('name');

		const thread = await CreateThread(locals.user.uuid);

		return { success: true, thread: thread };
	}
};
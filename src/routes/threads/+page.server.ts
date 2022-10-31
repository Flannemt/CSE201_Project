import { CreateThread, GetThread, GetUser } from '$db/database';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const user = GetUser(locals.user.id);

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	return {
		threads: user.threads.map((thread) => GetThread(thread)?.toJSON())
	};
};

export const actions: Actions = {
	create: async ({ locals }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		// const data = await request.formData();
		// const name = data.get('name');

		const thread = CreateThread(locals.user.id);

		return { success: true, thread: thread.toJSON() };
	}
};

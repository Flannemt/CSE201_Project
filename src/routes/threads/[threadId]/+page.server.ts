import { GetThread, GetUser, SendMessage } from '$db/database';
import { error } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params, locals }) => {
	const { threadId } = params;

	// Check to see if the threadID looks valid
	if (!threadId || !threadId.match(/^[0-9]+$/)) {
		return error(404, 'Thread not found');
	}

	// Check if the user is logged in
	const user = locals.user;

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	const thread = GetThread(threadId);

	// Check if the user has access to this thread and if the thread exists
	if (!thread || !thread.users.some((u) => u.id === user.id.toString())) {
		throw error(404, 'Not found');
	}

	return {
		thread: thread.toJSON()
	};
};

export const actions: Actions = {
	message: async ({ locals, request, params }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		const data = await request.formData();
		const content = data.get('content')?.toString();

		if (!content) {
			return {
				success: false
			};
		}

		const success = SendMessage(locals.user.id, params.threadId, content);

		return { success };
	},
	invite: async ({ locals, request, params }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		const data = await request.formData();
		const userId = data.get('content')?.toString();

		if (!userId) {
			return {
				success: false
			};
		}

		const thread = GetThread(params.threadId);
		const user = GetUser(userId);

		if (!thread || !user) {
			return {
				success: false
			};
		}

		thread.users.push({
			id: userId,
			lastRead: null
		});

		user.threads.push(params.threadId);

		return { success: true };
	}
};

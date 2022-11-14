import {
	AddFriend,
	AddUserToThread,
	CreateThread,
	GetThreadData,
	GetUserData,
	SendMessage
} from '$db/database';
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

	const thread = await GetThreadData(threadId);

	// Check if the user has access to this thread and if the thread exists
	if (!thread || !thread.users.some((u) => u.id === user.uuid)) {
		throw error(404, 'Not found');
	}

	const members = await Promise.all(thread.users.map(async (u) => GetUserData(u.id)));

	return {
		thread: thread,
		members
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

		const success = await SendMessage(locals.user.uuid, params.threadId, content);

		return { success };
	},
	invite: async ({ locals, request, params }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		const data = await request.formData();
		const userId = data.get('content')?.toString() ?? '';

		return await AddUserToThread(userId, params.threadId);
	},
	create: async ({ locals }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		// const data = await request.formData();
		// const name = data.get('name');

		const thread = await CreateThread(locals.user.uuid);

		return { success: true, thread: thread };
	},
	//friend action
	friend: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, 'Unauthorized');
		}

		const data = await request.formData();
		const friendId = data.get('friendId')?.toString() ?? '';

		const friend = await AddFriend(locals.user.uuid, friendId);

		console.log(friend);
		console.log((await GetUserData(locals.user.uuid))?.friends);

		return { success: friend };
	}
	//friend action here
};

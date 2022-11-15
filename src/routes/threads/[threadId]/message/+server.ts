import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GetThreadData } from '$db/database';

export const GET: RequestHandler = async ({ params, locals, url }) => {
	if (!locals.user || !locals.user.threads.includes(params.threadId)) {
		return error(401, 'Unauthorized');
	}

	const { threadId } = params;
	const count = url.searchParams.get('count');

	const thread = await GetThreadData(threadId);

	if (!count || !thread) {
		return json({ message: 'No messages here', count: 0 });
	}

	if (parseInt(count) === thread.messages.length) {
		return json({ message: 'All good', count: thread.messages.length });
	}

	// Return new messages
	const updates = thread.messages.slice(parseInt(count));

	return json({ message: 'Update needed', count: thread.messages.length, updates: updates });
};

import { error, json } from '@sveltejs/kit';
import type { RequestHandler, PageData } from './$types';

import { GetThreadData, SendMessage } from '$db/database';
import type { Actions, PageServerLoad } from './$types';

//import { onMount } from 'svelte';

//export let data: PageData;
//const { thread, members } = data;

//authentication, this may not be needed
/*
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


if (!locals.user || !locals.user.threads.includes(params.threadId)) {
  return error(401, 'Unauthorized');
}

*/

export const GET: RequestHandler = async ({ params, locals, url }) => {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { threadId } = params;

	//const startRaw = url.searchParams.get('start') ?? 1;
	//const limitRaw = url.searchParams.get('limit') ?? 20;

	const count = url.searchParams.get('count');

	const thread = await GetThreadData(threadId);

	if (count == null || thread == null) return json({ message: 'No messages here', count: 0 });
	else {
		if (parseInt(count) == thread.messages.length)
			return json({ message: 'All good', count: thread.messages.length });
		else  {
			//return json({ message: GetThread(params.threadId).messages.length });
			//store and send all updates
			//const test = thread.messages[thread.messages.length-1]; //pass test in updates
			
			const updates = thread.messages.slice(parseInt(count));

			return json({ message: 'update needed', count: thread.messages.length, updates: updates });
		}
		//if thread is null
	}
};

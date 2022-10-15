import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = (event) => {
	console.log('User IPV6: ' + event.getClientAddress());

	// if not logged in (add 'error' to import)
	// throw error(401, 'Not logged in');

	// In here you could do anything like call a database or
	// external API, and return the result

	// Success
	return json({ message: 'Hello world' });
};

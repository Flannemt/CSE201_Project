import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
	cookies.delete('access_token');
	cookies.delete('refresh_token');

	return {
		status: 200
	};
};

import { PUBLIC_DISCORD_CLIENT_ID as CLIENT_ID, PUBLIC_HOST_URL } from '$env/static/public';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';
export const load: PageLoad = ({ url }) => {
	const success = url.searchParams.get('success');

	if (browser && !success) {
		const endpoint =
			'https://discord.com/api/oauth2/authorize' +
			`?client_id=${CLIENT_ID}` +
			'&redirect_uri=' +
			encodeURIComponent(PUBLIC_HOST_URL + '/login/callback') +
			'&response_type=code&scope=identify';

		throw redirect(303, endpoint);
	}

	return {
		success: success === 'true'
	};
};

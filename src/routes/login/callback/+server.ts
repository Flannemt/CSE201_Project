import { PUBLIC_DISCORD_CLIENT_ID as CLIENT_ID } from '$env/static/public';
import { DISCORD_CLIENT_SECRET as CLIENT_SECRET } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const errorMsg = url.searchParams.get('error');

	if (errorMsg) {
		throw error(400, errorMsg);
	}

	if (!code) {
		throw error(400, 'Missing code');
	}

	const data = {
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: url.origin + '/login/callback',
		scope: 'identify'
	};

	const request = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	const response = (await request.json()) as {
		access_token: string;
		expires_in: number;
		refresh_token: string;
		error?: unknown;
	};

	if (response.error) {
		console.log('maybe?');
		console.log(response);
		throw error(400, new Error('Discord Authentication Error'));
	}

	const thirtyDays = 30 * 24 * 60 * 60;
	const accessTokenExpires = new Date(Date.now() + response.expires_in); // ~10 minutes
	const refreshTokenExpires = new Date(Date.now() + thirtyDays); // 30 days

	cookies.set('access_token', response.access_token, {
		expires: accessTokenExpires,
		maxAge: response.expires_in,
		path: '/'
	});
	cookies.set('refresh_token', response.refresh_token, {
		expires: refreshTokenExpires,
		maxAge: thirtyDays,
		path: '/'
	});

	throw redirect(303, '/login?success=true');
};

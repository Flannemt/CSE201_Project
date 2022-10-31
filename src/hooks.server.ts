import type { Handle } from '@sveltejs/kit';
import { PUBLIC_DISCORD_URL as DISCORD_API_URL, PUBLIC_HOST_URL } from '$env/static/public';
import { RefreshUser, type DiscordUser } from '$lib/discord';
import { CreateUser, GetUser } from '$db/database';

interface CookieData {
	name: string;
	value: string;
	expires: string;
}

export const handle: Handle = async ({ event, resolve }) => {
	const access = event.cookies.get('access_token');
	const refresh = event.cookies.get('refresh_token');

	event.locals.access_token = access;
	event.locals.refresh_token = refresh;

	if (!event.locals.access_token && !event.locals.refresh_token) {
		event.locals.user = false;

		return await resolve(event);
	}

	const { session, cookies } = await getUser(event.locals);
	const { user } = session;

	event.locals.user = user;

	if (cookies && cookies.length > 0) {
		for (const { name, value, expires } of cookies) {
			if (value === 'deleted') {
				event.cookies.delete(name);
			} else {
				event.cookies.set(name, value, {
					path: '/',
					expires: new Date(expires)
				});
			}
		}
	}

	return await resolve(event);
};

async function getUser(
	locals: App.Locals
): Promise<{ session: App.Session; cookies?: CookieData[] }> {
	if (!locals.access_token && !locals.refresh_token) {
		return { session: { user: false } };
	}

	if (!locals.access_token && locals.refresh_token) {
		return refreshUser(locals.refresh_token);
	}

	if (locals.access_token) {
		const data = await fetchUser(locals.access_token);
		if (data.session.user) return data;

		if (locals.refresh_token) {
			return refreshUser(locals.refresh_token);
		}
	}

	// Not authenticated, return empty user object
	return {
		session: {
			user: false
		}
	};
}

async function fetchUser(token: string): Promise<{ session: App.Session; cookies?: CookieData[] }> {
	const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
		headers: { Authorization: `Bearer ${token}` }
	});

	// Returns a discord user if JWT was valid
	const response = (await request.json()) as DiscordUser;

	if (response.id) {
		const user = GetUser(response.id) ?? CreateUser(response.id);
		return {
			session: {
				user: user.toJSON()
			}
		};
	} else {
		return {
			session: {
				user: false
			}
		};
	}
}

async function refreshUser(
	token: string
): Promise<{ session: App.Session; cookies?: CookieData[] }> {
	const failure: { session: App.Session; cookies?: CookieData[] } = {
		session: {
			user: false
		},
		cookies: [
			{
				name: 'access_token',
				value: 'deleted',
				expires: new Date(0).toUTCString()
			},
			{
				name: 'refresh_token',
				value: 'deleted',
				expires: new Date(0).toUTCString()
			}
		]
	};

	try {
		const discordResponse = await RefreshUser(token, PUBLIC_HOST_URL + '/login/callback');

		if (!discordResponse.access_token) return failure;

		const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
			headers: { Authorization: `Bearer ${discordResponse.access_token}` }
		});

		const response = (await request.json()) as DiscordUser;

		if (!response.id) return failure;

		const user = GetUser(response.id) || CreateUser(response.id);

		return {
			session: { user: user.toJSON() },
			cookies: [
				{
					name: 'access_token',
					value: discordResponse.access_token,
					expires: discordResponse.access_token_expires
				},
				{
					name: 'refresh_token',
					value: discordResponse.refresh_token,
					expires: discordResponse.refresh_token_expires
				}
			]
		};
	} catch (error) {
		console.log(error);
		return failure;
	}
}

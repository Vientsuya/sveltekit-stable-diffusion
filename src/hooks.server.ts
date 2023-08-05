import { getSession } from '$lib/server/sessionStore';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = getSession(sid);
		if (session) {
			event.locals.username = session.username;
			event.locals.role = session.role;
		} else {
			// remove invalid/expired/unknown cookie
			cookies.delete('sid');
		}
	}

	const response = await resolve(event);
	return response;
};

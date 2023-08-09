import { redirect, fail } from '@sveltejs/kit';
import { checkUserCredentials } from '$lib';
import { createSession } from '$lib/server/sessionStore';
import type { Actions } from './$types';
import type { Cookies } from '@sveltejs/kit';
import type { User } from '$lib/server/sessionStore';

function performLogin(cookies: Cookies, user: User) {
	const maxAge = 60 * 60 * 24 * 30; // 30 days
	const sid = createSession(user, maxAge);
	cookies.set('sid', sid, { maxAge });
}

export const actions: Actions = {
	auth_user: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (username && password) {
			const user = await checkUserCredentials(username, password);
			if (user) {
				console.log('correct credentials', user);
				performLogin(cookies, user);
				throw redirect(303, '/');
			} else {
				return fail(400, { errorMessage: 'Incorrect credentials' });
			}
		} else {
			return fail(400, { errorMessage: 'Missing credentials' });
		}
	}
};

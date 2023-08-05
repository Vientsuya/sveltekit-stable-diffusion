import { redirect } from '@sveltejs/kit';
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

		const username: string = data.get('username') as string;
		const password = data.get('password') as string;

		const user = await checkUserCredentials(username, password);

		if (user) {
			console.log('correct credentials', user);
			performLogin(cookies, user);
			throw redirect(303, '/');
		}
	}
};

import { redirect, fail } from '@sveltejs/kit';
import { API_USER_URL } from '$env/static/private';
import { _performLogin } from '../signin/+page.server';
import type { UserFormData } from '../../ambient';

async function createUser(payload: UserFormData) {
	const userRes = await fetch(API_USER_URL, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'content-type': 'application/json; charset=UTF-8'
		}
	}).then((res) => res.json());

	return userRes.user;
}

async function isUsernameTaken(username: string) {
	const userRes = await fetch(`${API_USER_URL}?username=${username}`).then((res) => res.json());
	return userRes.user;
}

export const actions = {
	create_user: async ({ cookies, request }) => {
		const data = await request.formData();

		const username: string = data.get('username') as string;
		const password = data.get('password') as string;
		const email = data.get('email') as string;

		const payload: UserFormData = {
			username: username,
			password: password,
			email: email
		};

		// error checks
		if (!username || !password || !email) {
			return fail(400, { errorMessage: 'Missing credentials' });
		}

		if (await isUsernameTaken(username)) {
			return fail(400, { errorMessage: 'Username is already taken' });
		}

		// create user after checkss
		const user = await createUser(payload);
		_performLogin(cookies, user);
		throw redirect(303, '/');
	}
};

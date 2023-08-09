import { redirect, fail } from '@sveltejs/kit';
import { API_USER_URL } from '$env/static/private';
import { _performLogin } from '../signin/+page.server';
import type { Actions } from './$types';
import type { UserFormData } from '../../ambient';

async function createUser(payload: UserFormData) {
	const userRes = await fetch(API_USER_URL, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'content-type': 'application/json; charset=UTF-8'
		}
	}).then((res) => res.json());

	console.log(`to jest userRes: ${userRes}`);
	return userRes.user;
}

export const actions: Actions = {
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

		if (username && password && email) {
			const user = await createUser(payload);
			_performLogin(cookies, user);

			throw redirect(303, '/');
		} else {
			return fail(400, { errorMessage: 'Missing credentials' });
		}
	}
};

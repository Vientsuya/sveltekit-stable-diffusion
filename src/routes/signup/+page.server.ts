import type { Actions } from './$types';
import { API_USER_URL } from '$env/static/private';
import type { UserFormData } from '../../ambient';

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

		await fetch(API_USER_URL, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json; charset=UTF-8'
			}
		}).then((res) => res.json());
	}
};

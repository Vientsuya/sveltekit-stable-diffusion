import { API_USER_URL } from '$env/static/private';
import type { User } from '$lib/server/sessionStore';

// place files you want to import through the `$lib` alias in this folder.
export async function checkUserCredentials(
	username: string,
	password: string
): Promise<User | null> {
	const users = await fetch(API_USER_URL, {
		method: 'GET',
		headers: {
			'content-type': 'application/json; charset=UTF-8'
		}
	}).then((res) => res.json());

	const user: User = users.user.find((user: any) => user.username === username);

	return user?.password === password && user?.username === username ? user : null;
}

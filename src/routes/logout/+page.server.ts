import { deleteSession } from '$lib/server/sessionStore';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const sid = cookies.get('sid');
	if (sid) {
		cookies.delete('sid');
		deleteSession(sid);
	}

	throw redirect(303, '/');
};

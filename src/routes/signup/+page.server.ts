import type { Actions } from './$types';

export const actions: Actions = {
	create_user: async ({ cookies, request }) => {
		const data = await request.formData();
	}
};

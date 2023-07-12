import type { Actions } from './$types';

export const actions: Actions = {
	get_image: async ({ cookies, request }) => {
		const data = await request.formData();

		const url = 'http://127.0.0.1:7860/sdapi/v1/txt2img';
		const payload = {
			prompt: data.get('prompt'),
			steps: 5
		};

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json; charset=UTF-8'
			}
		}).then((res) => res.json());

		return response;
	}
};

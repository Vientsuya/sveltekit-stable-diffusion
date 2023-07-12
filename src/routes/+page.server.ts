import type { Actions } from './$types';
import { API_TXT2IMG_URL } from '$env/static/private';

export const actions: Actions = {
	get_image: async ({ cookies, request }) => {
		const data = await request.formData();

		const overrideSettings = {
			sd_model_checkpoint: 'realisticVisionV30_v30VAE'
		};

		const payload = {
			prompt: data.get('prompt'),
			negative_prompt: data.get('negative_prompt'),
			steps: data.get('steps'),
			override_settings: overrideSettings
		};

		const response = await fetch(API_TXT2IMG_URL, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json; charset=UTF-8'
			}
		}).then((res) => res.json());

		return response;
	}
};

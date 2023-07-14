import type { Actions, PageServerLoad } from './$types';
import { API_TXT2IMG_URL, API_SD_MODELS_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
	const response = await fetch(API_SD_MODELS_URL).then((res) => res.json());

	return {
		models: response
	};
};

export const actions: Actions = {
	get_image: async ({ cookies, request }) => {
		const data = await request.formData();

		const overrideSettings = {
			sd_model_checkpoint: data.get('sd-model')
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

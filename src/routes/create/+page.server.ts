import type { Actions, PageServerLoad } from './$types';
import {
	API_TXT2IMG_URL,
	API_SD_MODELS_URL,
	API_SAMPLERS_URL,
	API_VAE_URL
} from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
	const responseModels = await fetch(API_SD_MODELS_URL).then((res) => res.json());
	const responseSamplers = await fetch(API_SAMPLERS_URL).then((res) => res.json());
	const responseVAE = await fetch(API_VAE_URL).then((res) => res.json());

	return {
		models: responseModels.map((model: any) => model.model_name),
		vaes: responseVAE.map((vae: any) => vae.model_name),
		samplers: responseSamplers.map((sampler: any) => sampler.name)
	};
};

export const actions: Actions = {
	get_image: async ({ cookies, request }) => {
		const data = await request.formData();

		const overrideSettings = {
			sd_model_checkpoint: data.get('sd-model'),
			sd_vae: data.get('sd-vae')
		};

		const payload = {
			prompt: data.get('prompt'),
			negative_prompt: data.get('negative-prompt'),
			steps: data.get('steps'),
			cfg_scale: data.get('cfg-scale'),
			sampler_name: data.get('sampler'),
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

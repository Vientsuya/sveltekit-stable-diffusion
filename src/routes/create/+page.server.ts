import * as fs from 'fs';
import { nanoid } from 'nanoid';
import { addImage } from '$lib/api_interactions/db_handler';
import getSeed from '$lib/utils/get_seed';
import type { Actions, PageServerLoad } from './$types';
import {
	API_TXT2IMG_URL,
	API_SD_MODELS_URL,
	API_SAMPLERS_URL,
	API_VAE_URL,
	API_IMAGE_URL,
	PROJECT_IMAGE_DIR
} from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
	const responseModels = await fetch(API_SD_MODELS_URL).then((res) => res.json());
	const responseSamplers = await fetch(API_SAMPLERS_URL).then((res) => res.json());
	const responseVAE = await fetch(API_VAE_URL).then((res) => res.json());
	const responseImages = await fetch(API_IMAGE_URL).then((res) => res.json());

	return {
		models: responseModels.map((model: any) => model.model_name),
		vaes: responseVAE.map((vae: any) => vae.model_name),
		samplers: responseSamplers.map((sampler: any) => sampler.name),
		images: responseImages
	};
};

export const actions: Actions = {
	get_image: async ({ cookies, request, locals }) => {
		const data = await request.formData();

		const overrideSettings = {
			sd_model_checkpoint: data.get('sd-model') as string,
			sd_vae: data.get('sd-vae') as string
		};

		const payload = {
			prompt: data.get('prompt') as string,
			negative_prompt: data.get('negative-prompt') as string,
			steps: Number(data.get('steps')),
			cfg_scale: Number(data.get('cfg-scale')),
			sampler_name: data.get('sampler') as string,
			override_settings: overrideSettings
		};

		const response = await fetch(API_TXT2IMG_URL, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json; charset=UTF-8'
			}
		}).then((res) => res.json());

		const imageString = response.images[0];
		const imageBuffer = Buffer.from(imageString, 'base64');
		const imageId = nanoid(10);

		const ImageData = {
			image_url: `generated_images/${imageId}.png`,
			sd_model_checkpoint: response.parameters.override_settings.sd_model_checkpoint as string,
			sd_vae: response.parameters.override_settings.sd_vae as string,
			sampler_name: response.parameters.sampler_name as string,
			prompt: response.parameters.prompt as string,
			negative_prompt: response.parameters.negative_prompt as string,
			cfg_scale: response.parameters.cfg_scale as number,
			steps: response.parameters.steps as number,
			seed: getSeed(response.info as string)
		};

		fs.writeFileSync(`static/generated_images/${imageId}.png`, imageBuffer);
		addImage(ImageData, locals.user_id as number);
	}
};

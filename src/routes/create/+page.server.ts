import * as fs from 'fs';
import { nanoid } from 'nanoid';
import { addImage } from '$lib/api_interactions/db_handler';
import type { Actions, PageServerLoad } from './$types';
import {
	API_TXT2IMG_URL,
	API_SD_MODELS_URL,
	API_SAMPLERS_URL,
	API_VAE_URL,
	API_GET_IMAGES_URL
} from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
	const responseModels = await fetch(API_SD_MODELS_URL).then((res) => res.json());
	const responseSamplers = await fetch(API_SAMPLERS_URL).then((res) => res.json());
	const responseVAE = await fetch(API_VAE_URL).then((res) => res.json());
	const images = await fetch(API_GET_IMAGES_URL).then((res) => res.json());

	return {
		models: responseModels.map((model: any) => model.model_name),
		vaes: responseVAE.map((vae: any) => vae.model_name),
		samplers: responseSamplers.map((sampler: any) => sampler.name),
		images: images.images
	};
};

export const actions: Actions = {
	get_image: async ({ cookies, request }) => {
		const data = await request.formData();

		const overrideSettings = {
			sd_model_checkpoint: data.get('sd-model') as string,
			sd_vae: data.get('sd-vae') as string
		};

		const payload = {
			prompt: data.get('prompt') as string,
			negative_prompt: data.get('negative-prompt') as string,
			steps: data.get('steps') as unknown as number,
			cfg_scale: data.get('cfg-scale') as unknown as number,
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
			image_url: `/generated_images/${imageId}.png`,
			sd_model_checkpoint: overrideSettings.sd_model_checkpoint,
			sd_vae: overrideSettings.sd_vae,
			sampler_name: payload.sampler_name,
			prompt: payload.prompt,
			negative_prompt: payload.negative_prompt,
			cfg_scale: payload.cfg_scale,
			steps: payload.steps
		};

		fs.writeFileSync(`static/generated_images/${imageId}.png`, imageBuffer);
		addImage(ImageData);
	}
};

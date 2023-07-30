import { API_IMAGE_URL } from '$env/static/private';

export type Image = {
	image_url: string;
	sd_model_checkpoint: string;
	sd_vae: string;
	sampler_name: string;
	prompt: string;
	negative_prompt: string;
	cfg_scale: number;
	steps: number;
	seed: string;
};

export async function addImage(image: Image) {
	const payload = {
		image_url: image.image_url,
		sd_model_checkpoint: image.sd_model_checkpoint,
		sd_vae: image.sd_vae,
		sampler_name: image.sampler_name,
		prompt: image.prompt,
		negative_prompt: image.negative_prompt,
		cfg_scale: image.cfg_scale,
		steps: image.steps,
		seed: image.seed
	};

	fetch(API_IMAGE_URL, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'content-type': 'application/json; charset=UTF-8'
		}
	});
}

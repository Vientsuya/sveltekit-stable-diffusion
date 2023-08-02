export type generatedImage = {
	cfg_scale: number;
	created_at: string;
	id: number;
	image_url: string;
	prompt: string;
	negative_prompt: string;
	sampler_name: string;
	sd_model_checkpoint: string;
	sd_vae: string;
	seed: string;
	steps: number;
};

export type UserFormData = {
	username: string;
	password: string;
	email: string;
};

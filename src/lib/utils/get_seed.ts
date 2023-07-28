//  const exampleObj = {
//	  info: '{"prompt": "young woman", "all_prompts": ["young woman"], "negative_prompt": "nsfw", "all_negative_prompts": ["naked"], "seed": 3825577683, "all_seeds": [3825577683], "subseed": 3482281026, "all_subseeds": [3482281026], "subseed_strength": 0, "width": 512, "height": 512, "sampler_name": "Euler a", "cfg_scale": 7.0, "steps": 14, "batch_size": 1, "restore_faces": false, "face_restoration_model": null, "sd_model_hash": "9584e2c050", "seed_resize_from_w": -1, "seed_resize_from_h": -1, "denoising_strength": 0, "extra_generation_params": {}, "index_of_first_image": 0, "infotexts": ["young woman\\nNegative prompt: naked\\nSteps: 14, Sampler: Euler a, CFG scale: 7.0, Seed: 3825577683, Size: 512x512, Model hash: 9584e2c050, Model: cyberrealistic_v32, Seed resize from: -1x-1, Denoising strength: 0, Version: v1.4.0"], "styles": [], "job_timestamp": "20230728123810", "clip_skip": 1, "is_using_inpainting_conditioning": false}'
//  };

export default function getSeed(imageInfo: string): string {
	const info = JSON.parse(imageInfo);
	return String(info.seed);
}

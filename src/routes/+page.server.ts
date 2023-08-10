import { API_IMAGE_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const responseImages = await fetch(API_IMAGE_URL).then((res) => res.json());

	return {
		images: responseImages
	};
};

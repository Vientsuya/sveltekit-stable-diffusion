import { API_IMAGE_URL } from '$env/static/private';

export const load = async () => {
	const responseImages = await fetch(API_IMAGE_URL).then((res) => res.json());

	return {
		images: responseImages
	};
};

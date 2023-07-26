import { API_ADD_IMAGE_URL } from '$env/static/private';

type Image = {
	image_url: string;
};

export async function addImage(image: Image) {
	const payload = {
		image_url: image.image_url
	};

	fetch(API_ADD_IMAGE_URL, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'content-type': 'application/json; charset=UTF-8'
		}
	});
}

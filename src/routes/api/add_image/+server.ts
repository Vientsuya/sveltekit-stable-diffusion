import { PrismaClient } from '@prisma/client';
import type { Image } from '$lib/api_interactions/db_handler';
import type { RequestEvent } from './$types.js';

const prisma = new PrismaClient();

export async function POST(requestEvent: RequestEvent) {
	const body: Image = await requestEvent.request.json();
	try {
		if (body) {
			const res = await prisma.images.create({ data: body });
			return new Response(
				JSON.stringify({ message: 'Everything went OK.', added_image: body.image_url }),
				{ status: 200 }
			);
		} else {
			return new Response(JSON.stringify({ error: 'Body is empty.' }), {
				status: 500
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error_message: error }), {
			status: 500
		});
	} finally {
		async () => {
			await prisma.$disconnect();
		};
	}
}

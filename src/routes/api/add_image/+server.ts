import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const body = await request.json();
	try {
		if (body) {
			// res is a number of added images
			const res = await prisma.images.createMany({
				data: [
					{ image_url: body.image_url },
					{ image_url: body.image_url },
					{ image_url: body.image_url },
					{ image_url: body.image_url }
				],
				skipDuplicates: true
			});

			return new Response(
				JSON.stringify({ message: 'Wszystko poszło git', added_image: body.image_url }),
				{ status: 200 }
			);
		} else {
			return new Response(JSON.stringify({ error: 'Body jest puste, weź że podaj parametr' }), {
				status: 500
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Cosik nie działa przy tworzeniu image.' }), {
			status: 500
		});
	} finally {
		async () => {
			await prisma.$disconnect();
		};
	}
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const res = await prisma.images.findMany();

		return new Response(JSON.stringify({ message: 'Wszystko poszło git', images: res }), {
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error }), {
			status: 500
		});
	} finally {
		await prisma.$disconnect();
	}
}

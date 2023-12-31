import { PrismaClient, Prisma } from '@prisma/client';
import type { UserFormData } from '../../../ambient';

const prisma = new PrismaClient();

export async function GET({ url }) {
	try {
		const username = url.searchParams.get('username');
		let user;

		if (username) {
			user = await prisma.users.findUnique({
				where: {
					username: username
				},
				include: {
					roles: true
				}
			});
		} else {
			user = await prisma.users.findMany({
				include: {
					roles: true
				}
			});
		}

		return new Response(JSON.stringify({ message: 'User was found.', user: user }), {
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

export async function POST(requestEvent) {
	const body: UserFormData = await requestEvent.request.json();
	try {
		if (body) {
			const res = await prisma.users.create({
				data: {
					username: body.username,
					password: body.password,
					email: body.email,
					roles: {
						connect: {
							id: 1
						}
					}
				},
				include: {
					roles: true
				}
			});

			return new Response(
				JSON.stringify({
					message: 'Created an user successfully',
					user: res
				}),
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

export async function DELETE(requestEvent) {
	const body = await requestEvent.request.json();
	try {
		if (body) {
			const res = await prisma.images.delete({ where: { id: body.id } });
			return new Response(
				JSON.stringify({ message: 'Everything went OK.', deleted_image: body.id }),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json'
					}
				}
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

export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
			'Access-Control-Allow-Methods': 'POST, DELETE, GET',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	});
}

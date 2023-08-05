import { PrismaClient, Prisma } from '@prisma/client';
import type { UserFormData } from '../../../ambient';
import type { RequestEvent } from './$types.js';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const user = await prisma.users.findMany({
			include: {
				roles: true
			}
		});

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

export async function POST(requestEvent: RequestEvent) {
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
					registered_users_name: body.username
				}),
				{ status: 200 }
			);
		} else {
			return new Response(JSON.stringify({ error: 'Body is empty.' }), {
				status: 500
			});
		}
	} catch (error) {
		throw error;
		return new Response(JSON.stringify({ error_message: error }), {
			status: 500
		});
	} finally {
		async () => {
			await prisma.$disconnect();
		};
	}
}

export async function DELETE(requestEvent: RequestEvent) {
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

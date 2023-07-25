import { conn } from '$lib/db/mysql';
import type { RowDataPacket } from 'mysql2/promise';

export async function GET() {
	try {
		// Execute the query and convert to a promise
		const rows = await new Promise<RowDataPacket[]>((resolve, reject) => {
			conn.query('SELECT image_url FROM images;', (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows as RowDataPacket[]);
				}
			});
		});

		// Extract the relevant data from the rows
		const data = rows.map((row: any) => row.image_url);

		// Return the data in the response
		return new Response(JSON.stringify({ image_url: data }), { status: 200 });
	} catch (error) {
		// If an error occurs during the database query, return an error response
		return new Response(JSON.stringify({ error: 'Cosik nie działa w wysyłaniu.' }), {
			status: 500
		});
	}
}

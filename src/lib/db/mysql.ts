import mysql from 'mysql2';
import type { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
	host: 'localhost',
	port: 3333,
	user: 'root',
	password: 'gafasa1',
	database: 'sd_generator_db'
};

export const conn = mysql.createConnection(access);

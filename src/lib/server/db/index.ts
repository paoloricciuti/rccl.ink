import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const client = new Database(DATABASE_URL);

export const db = drizzle(client);

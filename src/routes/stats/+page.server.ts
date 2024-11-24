import { db } from '$lib/server/db';
import { links } from '$lib/server/db/schema';

export async function load() {
	const links_res = await db.select().from(links).execute();
	return {
		links: links_res ?? [],
		terminal_title: 'stats',
	};
}

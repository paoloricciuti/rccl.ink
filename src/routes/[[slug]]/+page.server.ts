import { PASSWORD } from '$env/static/private';
import { db } from '$lib/server/db/index.js';
import { links } from '$lib/server/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { FIELDS } from './+page.svelte';

export async function load({ url: { searchParams }, params: { slug } }) {
	if (slug) {
		const [link] = await db.select().from(links).where(eq(links.slug, slug)).execute();
		if (link) {
			db.update(links)
				.set({
					visits: link.visits + 1,
				})
				.where(eq(links.slug, slug))
				.execute();
			redirect(308, link.link);
		}
		const new_params = new URLSearchParams(searchParams);
		new_params.set('slug', slug);
		redirect(302, `/?${new_params.toString()}`);
	}

	const to_short = searchParams.get('url')?.toString() ?? '';
	const wanted_slug = searchParams.get('slug')?.toString() ?? '';

	return {
		to_short,
		slug: wanted_slug,
	};
}

export const actions = {
	async create({ request }) {
		const data = await request.formData();
		const link = data.get(FIELDS.url)?.toString();
		const slug = data.get(FIELDS.slug)?.toString();
		const password = data.get(FIELDS.password)?.toString();
		if (!link) {
			return fail(400, { error: 'Missing URL' });
		}
		if (!slug) {
			return fail(400, { error: 'Missing slug' });
		}
		if (password !== PASSWORD) {
			return fail(400, { error: "Can't create link" });
		}
		try {
			await db
				.insert(links)
				.values({
					link,
					slug,
				})
				.execute();
		} catch (e) {
			if ((e as { code: string }).code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(500, { error: 'Link already exists' });
			}
			return fail(500, { error: "Can't create link" });
		}
		return {
			ok: true,
		};
	},
};

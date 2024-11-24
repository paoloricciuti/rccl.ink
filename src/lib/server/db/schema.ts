import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const links = sqliteTable(
	'links',
	{
		id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
		slug: text('slug').notNull(),
		link: text('link').notNull(),
		visits: integer('visits').notNull().default(0),
	},
	(table) => {
		return {
			id_index: uniqueIndex('unique_slug').on(table.id),
			slug_index: uniqueIndex('unique_slug').on(table.slug),
		};
	},
);

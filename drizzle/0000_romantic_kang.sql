CREATE TABLE `links` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`link` text NOT NULL,
	`visits` integer DEFAULT 0 NOT NULL
);

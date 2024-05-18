CREATE TABLE `note` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT 'Untitled Note',
	`content` text,
	`userId` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

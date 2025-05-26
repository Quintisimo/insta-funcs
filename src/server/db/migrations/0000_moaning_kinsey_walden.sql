CREATE TABLE `functions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`originalCode` text NOT NULL,
	`compiledCode` text NOT NULL,
	`method` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP)
);

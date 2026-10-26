CREATE TABLE `content` (
	`kind` text NOT NULL,
	`id` text NOT NULL,
	`data` text NOT NULL,
	PRIMARY KEY(`kind`, `id`)
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`service` text NOT NULL,
	`postcode` text NOT NULL,
	`address` text NOT NULL,
	`message` text NOT NULL,
	`source` text NOT NULL,
	`status` text DEFAULT 'New' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_enquiries_created` ON `enquiries` (`created`);--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);

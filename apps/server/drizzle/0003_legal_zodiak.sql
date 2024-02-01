ALTER TABLE "tag" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "link" ADD COLUMN "url" text NOT NULL;
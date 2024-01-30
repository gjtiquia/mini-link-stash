import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "@mini-link-stash/server";

export const trpc = createTRPCReact<AppRouter>();

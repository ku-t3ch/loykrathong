import { createTRPCRouter } from "@/server/api/trpc";
import { krathongRouter } from "./routers/krathong";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  krathongRouter: krathongRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

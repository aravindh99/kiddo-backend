import { z } from "zod";

export const parentDashboardSchema = z.object({
  query: z.object({
    limit: z.string().optional(),
    offset: z.string().optional(),
  }),
});

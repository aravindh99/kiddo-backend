import { z } from "zod";

export const attendanceSummaryQuerySchema = z.object({
  query: z.object({
    from_date: z.string().optional(),
    to_date: z.string().optional(),
    class_id: z.string().optional(),
    section_id: z.string().optional(),
    limit: z.string().optional(),
    offset: z.string().optional(),
  }),
});

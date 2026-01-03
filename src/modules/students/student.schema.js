import { z } from "zod";

/* admin: auto create */
export const autoCreateStudentsSchema = z.object({
  class_id: z.number(),
  sections: z.array(
    z.object({
      section_id: z.number(),
      count: z.number().int().positive(),
    })
  ).min(1),
});

/* student: first login */
export const completeStudentProfileSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
});

/* admin: move */
export const moveStudentSchema = z.object({
  section_id: z.number(),
});

/* admin: status */
export const updateStudentStatusSchema = z.object({
  is_active: z.boolean(),
});


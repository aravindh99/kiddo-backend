import asyncHandler from "../../shared/asyncHandler.js";
import { autoCreateStudentsService } from "./student.service.js";

export const autoCreateStudents = asyncHandler(async (req, res) => {
  const { class_id, sections } = req.body;

  const result = await autoCreateStudentsService({
    school_id: req.user.school_id,
    class_id,
    sections,
  });

  res.status(201).json({
    created: result.length,
    students: result,
  });
});

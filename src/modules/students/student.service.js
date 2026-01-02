import User from "../users/user.model.js";
import Student from "./student.model.js";
import AppError from "../../shared/appError.js";

export const autoCreateStudentsService = async ({
  school_id,
  class_id,
  sections,
}) => {
  if (!class_id) {
    throw new AppError("class_id is required", 400);
  }

  if (!Array.isArray(sections) || sections.length === 0) {
    throw new AppError("sections are required", 400);
  }

  const createdStudents = [];

  for (const section of sections) {
    const { name: sectionName, count } = section;

    if (!sectionName || count <= 0) {
      throw new AppError("Invalid section data", 400);
    }

    for (let i = 1; i <= count; i++) {
      const roll = String(i).padStart(3, "0");
      const username = `${class_id}${sectionName}${roll}`;

      // prevent duplicate users
      const exists = await User.findOne({
        where: { school_id, username },
      });

      if (exists) {
        throw new AppError(
          `Student ${username} already exists`,
          409
        );
      }

      const user = await User.create({
        role: "student",
        school_id,
        username,
        password: username,
        first_login: true,
        is_active: true,
        name: "Student",
      });

      const student = await Student.create({
        user_id: user.id,
        school_id,
        class_id,
        roll_no: roll,
        section: sectionName,
        is_active: true,
      });

      createdStudents.push({
        username,
        student_id: student.id,
      });
    }
  }

  return createdStudents;
};

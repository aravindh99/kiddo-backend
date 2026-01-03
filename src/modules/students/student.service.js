import User from "../users/user.model.js";
import Student from "./student.model.js";
import Class from "../classes/classes.model.js";
import Section from "../sections/section.model.js";
import AppError from "../../shared/appError.js";
import { getPagination } from "../../shared/utils/pagination.js";

/* =========================
   ADMIN: AUTO CREATE
========================= */
export const autoCreateStudentsService = async ({
  school_id,
  class_id,
  sections,
}) => {
  const created = [];

  for (const { section_id, count } of sections) {
    const section = await Section.findOne({
      where: { id: section_id, class_id, school_id },
    });

    if (!section) {
      throw new AppError("Section not found", 404);
    }

    for (let i = 1; i <= count; i++) {
      const roll = String(i).padStart(3, "0");
      const username = `${class_id}${section.name}${roll}`;

      const exists = await User.findOne({
        where: { school_id, username },
      });
      if (exists) {
        throw new AppError(`Student ${username} already exists`, 409);
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
        section_id,
        roll_no: roll,
        is_active: true,
      });

      created.push({ username, student_id: student.id });
    }
  }

  return created;
};

/* =========================
   ADMIN: LIST
========================= */


export const listStudentsService = async ({ school_id, query }) => {
  const { limit, offset } = getPagination(query);

  return Student.findAndCountAll({
    where: { school_id },
    limit,
    offset,
    include: [
      { model: User, attributes: ["id", "username", "name", "is_active"] },
      { model: Class, attributes: ["id", "class_name"] },
      { model: Section, attributes: ["id", "name"] },
    ],
    order: [["created_at", "DESC"]],
  });
};

/* =========================
   ADMIN: MOVE
========================= */
export const moveStudentService = async ({
  student_id,
  section_id,
  school_id,
}) => {
  const student = await Student.findOne({
    where: { id: student_id, school_id },
  });
  if (!student) throw new AppError("Student not found", 404);

  student.section_id = section_id;
  await student.save();
  return student;
};

/* =========================
   ADMIN: STATUS
========================= */
export const updateStudentStatusService = async ({
  student_id,
  is_active,
  school_id,
}) => {
  const student = await Student.findOne({
    where: { id: student_id, school_id },
  });
  if (!student) throw new AppError("Student not found", 404);

  student.is_active = is_active;
  await student.save();
  return student;
};

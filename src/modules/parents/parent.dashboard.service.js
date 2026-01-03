import Parent from "./parent.model.js";
import Student from "../students/student.model.js";
import User from "../users/user.model.js";
import Class from "../classes/classes.model.js";
import Section from "../sections/section.model.js";
import { getPagination } from "../../shared/utils/pagination.js";

export const getParentDashboardService = async ({
  parent_user_id,
  query,
}) => {
  const { limit, offset } = getPagination(query);

  return Parent.findAndCountAll({
    where: {
      user_id: parent_user_id,
      approval_status: "approved",
    },
    include: [
      {
        model: Student,
        where: { approval_status: "approved" },
        include: [
          {
            model: User,
            attributes: ["id", "name", "username", "is_active"],
          },
          {
            model: Class,
            attributes: ["id", "class_name"],
          },
          {
            model: Section,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });
};

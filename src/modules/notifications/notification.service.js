import Notification from "./notification.model.js";
import AppError from "../../shared/appError.js";

export const createNotificationService = async ({
  school_id,
  sender_user_id,
  sender_role,
  title,
  message,
  target_role,
  class_id,
  section_id,
}) => {
  /* Role enforcement */
  if (sender_role === "teacher") {
    if (target_role === "teacher") {
      throw new AppError(
        "Teachers cannot notify other teachers",
        403
      );
    }
  }

  if (sender_role !== "admin" && sender_role !== "teacher") {
    throw new AppError("Not allowed to send notifications", 403);
  }

  const notification = await Notification.create({
    school_id,
    sender_user_id,
    sender_role,
    title,
    message,
    target_role,
    class_id,
    section_id,
  });

  return notification;
};

/* LIST FOR USER */
export const listNotificationsForUserService = async ({
  school_id,
  user_role,
  class_id,
  section_id,
}) => {
  const where = {
    school_id,
    is_active: true,
  };

  if (user_role !== "admin") {
    where.target_role = ["all", user_role];
  }

  if (class_id) where.class_id = class_id;
  if (section_id) where.section_id = section_id;

  return Notification.findAll({
    where,
    order: [["created_at", "DESC"]],
  });
};

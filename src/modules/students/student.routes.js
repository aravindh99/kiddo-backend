import express from "express";
import { protect } from "../../shared/middlewares/auth.js";
import { allowRoles } from "../../shared/middlewares/role.js";
import { autoCreateStudents } from "./student.controller.js";

const router = express.Router();

router.post(
  "/auto-create",
  protect,
  allowRoles("school_admin"),
  autoCreateStudents
);

export default router;

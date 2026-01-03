import express from "express";
import { protect } from "../../shared/middlewares/auth.js";
import { allowRoles } from "../../shared/middlewares/role.js";
import { validate } from "../../shared/middlewares/validate.js";

import { parentDashboardSchema } from "./parent.dashboard.schema.js";
import { getParentDashboard } from "./parent.dashboard.controller.js";

const router = express.Router();

router.get(
    "/parents/dashboard",
    protect,
    allowRoles("parent"),
    validate(parentDashboardSchema),
    getParentDashboard
);

export default router;

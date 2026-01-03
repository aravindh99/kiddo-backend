import { getParentDashboardService } from "./parent.dashboard.service.js";

export const getParentDashboard = async (req, res, next) => {
  try {
    const result = await getParentDashboardService({
      parent_user_id: req.user.id,
      query: req.query,
    });

    res.json({
      total: result.count,
      students: result.rows.map((row) => ({
        relation_type: row.relation_type,
        student: row.student,
      })),
    });
  } catch (e) {
    next(e);
  }
};

import jwt from "jsonwebtoken";
import User from "../../modules/users/user.model.js";
import School from "../../modules/schools/school.model.js";
import AppError from "../appError.js";

export default async function auth(req, res, next) {
  try {
    // 1️⃣ Extract token
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = header.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Load user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    if (!user.is_active) {
      throw new AppError("User is inactive", 401);
    }

    // 4️⃣ School-level hard stop (except super_admin)
    if (user.role !== "super_admin") {
      const school = await School.findByPk(user.school_id);

      if (!school || school.status !== "active") {
        throw new AppError("School is inactive", 403);
      }
    }

    // 5️⃣ Attach trusted identity
    req.user = {
      id: user.id,
      role: user.role,
      school_id: user.school_id,
    };

    next();
  } catch (err) {
    next(err); // 🔥 forward EVERYTHING to global errorHandler
  }
}

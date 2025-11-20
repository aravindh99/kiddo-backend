import jwt from "jsonwebtoken";

export const jwtSign = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN);


export const jwtVerify = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}   
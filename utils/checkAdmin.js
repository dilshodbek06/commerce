import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decodedToken = jwt.verify(token, "uztelecom777");
            if (decodedToken.role === 'ADMIN') {
                req.userId = decodedToken._id;
                next();
            } else {
                return res.status(403).json({
                    message: "you aren't admin"
                });
            }
        } catch (e) {
            return res.status(403).json({
                message: "invalid token"
            });
        }
    } else {
        return res.status(403).json({
            message: "invalid token"
        });
    }
}
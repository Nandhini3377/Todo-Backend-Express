import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied: No token provided" });

    try {
        const decoded = jwt.verify(token, 'RANDOM'); 
        const user = await User.findById(decoded.user_id);
        if (!user) return res.status(404).json({ message: "User not found" });
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authenticate;

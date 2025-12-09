import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(403).json({message: "Access Token required"});

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({message: "Inavalid or expired Token"});
    }
}

export const authorizeRoles = (...allowedRoles) =>{
    return (req, res, next) =>{
        if(!req.user){
            return res.status(403).json({message: "Authentication Required " });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: "Access Denied"})
        }

        next();
    }
}

export const protect = verifyToken;
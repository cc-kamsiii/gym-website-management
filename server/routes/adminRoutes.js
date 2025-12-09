import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

const adminOnly = authorizeRoles("admin");

router.get("/dashboard", protect, adminOnly, (req, res) =>{
    res.json({message: "Admin Dashboard", user: req.user});
});


router.get("/users", protect, adminOnly, async (req, res) =>{
    try {
        const users = await User.find().select("-password");
        res.json({
            message: "All users",
            users,
            count: users.length
        });
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"})
    }
});

router.get("/users/:id", protect, authorizeRoles, async (req, res) =>{
    try {
        const specificUser = User.findById(req.params.id).select("-password");

        if(!specificUser) return res.status(403).json({message: "User not found"})

        res.json({specificUser});
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

export default router;
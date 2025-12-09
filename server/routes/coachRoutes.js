import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const coachAndAdmin = authorizeRoles("coach", "admin");

router.get("/dashboard", protect, coachAndAdmin ,(req, res) =>{
    res.json({message: "Coach Dashboard", user: req.user});
});

router.get("/clients", protect, coachAndAdmin, (req, res) =>{
    res.json({message: "Clients List", user: req.user});
})

router.post("/training-plan", protect, coachAndAdmin ,(req, res) =>{
    res.json({message: "Coach Training Plan", user: req.user});
});

router.get("/schedule", protect, coachAndAdmin, (req,res) =>{
    res.json({message: "Coach Schedule", user: req.user});
})

export default router;



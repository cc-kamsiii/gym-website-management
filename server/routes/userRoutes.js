import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const allRoles = authorizeRoles("user", "admin", "coach");

router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "User Dashboard", user: req.user });
});

router.get("/profile", protect, (req, res) => {
  res.json({ message: "User Profile", user: req.user });
});

router.post(
  "/schedule",
  protect,
  allRoles,
  async (req, res) => {
    res.json({ message: "Schedule Created", user: req.user });
  }
);

router.get("/schedules", protect, (req, res) =>{
    res.json({message: "User Schedule", user: req.user});
})

export default router;
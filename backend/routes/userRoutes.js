import express from "express";
import {
  startFollowing,
  stopFollowing,
  getAllUsers,
} from "../controllers/userActions.js";
import tokenGuard from "../middleware/tokenGuard.js";

const router = express.Router();

router.post("/follow/:id", tokenGuard, startFollowing);
router.post("/unfollow/:id", tokenGuard, stopFollowing);

// New Route for finding people
router.get("/all", tokenGuard, getAllUsers);

export default router;
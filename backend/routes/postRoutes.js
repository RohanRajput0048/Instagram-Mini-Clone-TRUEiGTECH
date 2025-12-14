import express from "express";
import tokenGuard from "../middleware/tokenGuard.js";
import { 
    publishPost, 
    likeThisPost, 
    unlikeThisPost,
    dropComment,
    loadUserFeed,
    getMyPosts // <--- Import the new function
} from "../controllers/postActions.js";

const router = express.Router();

router.post("/create", tokenGuard, publishPost);
router.post("/like/:id", tokenGuard, likeThisPost);
router.post("/unlike/:id", tokenGuard, unlikeThisPost);
router.post("/comment/:id", tokenGuard, dropComment);
router.get("/feed", tokenGuard, loadUserFeed);

// New Route for Profile
router.get("/mine", tokenGuard, getMyPosts);

export default router;
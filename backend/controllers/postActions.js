import Post from "../models/Post.js";
import User from "../models/User.js";

export const publishPost = async (req, res) => {
  try {
    const currentUser = req.loggedInUser;
    const { imageLink, captionText } = req.body;

    if (!imageLink) {
      return res.status(400).json({
        message: "Image link is required",
      });
    }

    const freshPost = await Post.create({
      owner: currentUser,
      imageLink,
      captionText,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: freshPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Post creation failed",
    });
  }
};

// LIKE POST
export const likeThisPost = async (req, res) => {
  try {
    const userId = req.loggedInUser;
    const postId = req.params.id;

    const targetPost = await Post.findById(postId);

    if (!targetPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = targetPost.likedBy.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      return res.status(400).json({
        message: "Post already liked",
      });
    }

    targetPost.likedBy.push(userId);
    await targetPost.save();

    res.status(200).json({
      message: "Post liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Like operation failed",
    });
  }
};

// UNLIKE POST
export const unlikeThisPost = async (req, res) => {
  try {
    const userId = req.loggedInUser;
    const postId = req.params.id;

    const targetPost = await Post.findById(postId);

    if (!targetPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const hasLiked = targetPost.likedBy.some(
      (id) => id.toString() === userId
    );

    if (!hasLiked) {
      return res.status(400).json({
        message: "You have not liked this post",
      });
    }

    targetPost.likedBy = targetPost.likedBy.filter(
      (id) => id.toString() !== userId
    );

    await targetPost.save();

    res.status(200).json({
      message: "Post unliked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unlike operation failed",
    });
  }
};

// ADD COMMENT
export const dropComment = async (req, res) => {
  try {
    const commenterId = req.loggedInUser;
    const postId = req.params.id;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        message: "Comment message cannot be empty",
      });
    }

    const targetPost = await Post.findById(postId);

    if (!targetPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    targetPost.commentStack.push({
      author: commenterId,
      message: message.trim(),
    });

    await targetPost.save();

    res.status(201).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Comment operation failed",
    });
  }
};

// FETCH FEED POSTS
export const loadUserFeed = async (req, res) => {
  try {
    const viewerId = req.loggedInUser;

    const viewerProfile = await User.findById(viewerId).select("following");

    if (!viewerProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const feedPosts = await Post.find({
      owner: { $in: viewerProfile.following },
    })
      .populate("owner", "username")
      .populate("commentStack.author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: feedPosts.length,
      posts: feedPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load feed",
    });
  }
};

// GET USER'S POSTS (Add this at the bottom)
export const getMyPosts = async (req, res) => {
  try {
    const userId = req.loggedInUser; // ID from token
    const myPosts = await Post.find({ owner: userId }).sort({ createdAt: -1 });
    
    res.status(200).json(myPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts" });
  }
};
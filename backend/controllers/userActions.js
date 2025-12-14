import User from "../models/User.js";

// FOLLOW USER
export const startFollowing = async (req, res) => {
  try {
    const myId = req.loggedInUser;
    const targetUserId = req.params.id;

    if (myId === targetUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const myProfile = await User.findById(myId);
    const targetProfile = await User.findById(targetUserId);

    if (!targetProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (myProfile.following.includes(targetUserId)) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    myProfile.following.push(targetUserId);
    targetProfile.followers.push(myId);

    await myProfile.save();
    await targetProfile.save();

    res.status(200).json({
      message: "Followed user successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Follow operation failed",
    });
  }
};

// UNFOLLOW USER
export const stopFollowing = async (req, res) => {
  try {
    const myId = req.loggedInUser;
    const targetUserId = req.params.id;

    const myProfile = await User.findById(myId);
    const targetProfile = await User.findById(targetUserId);

    if (!targetProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    myProfile.following = myProfile.following.filter(
      (userId) => userId.toString() !== targetUserId
    );

    targetProfile.followers = targetProfile.followers.filter(
      (userId) => userId.toString() !== myId
    );

    await myProfile.save();
    await targetProfile.save();

    res.status(200).json({
      message: "Unfollowed user successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unfollow operation failed",
    });
  }
};

// GET ALL USERS (Add this at the bottom)
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users but hide their passwords
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to load users" });
  }
};
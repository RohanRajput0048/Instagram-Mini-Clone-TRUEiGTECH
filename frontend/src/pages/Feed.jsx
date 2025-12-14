import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
// IMPORT ICONS
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaEllipsisH } from "react-icons/fa";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [followingMap, setFollowingMap] = useState({});
  const [currentUserId, setCurrentUserId] = useState("");

  const refreshFeed = async () => {
    try {
      // Get current user ID from storage to check if WE liked the post
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      setCurrentUserId(userInfo.id);

      const response = await apiClient.get("/posts/feed");
      setPosts(response.data.posts);
      
      const initialFollowState = {};
      response.data.posts.forEach((post) => {
        initialFollowState[post.owner._id] = true; 
      });
      setFollowingMap(initialFollowState);
    } catch (err) { console.error("Error loading feed"); }
  };

  useEffect(() => { refreshFeed(); }, []);

  const toggleFollow = async (userId) => {
    const isFollowing = followingMap[userId];
    try {
      if (isFollowing) {
        await apiClient.post(`/users/unfollow/${userId}`);
        setFollowingMap((prev) => ({ ...prev, [userId]: false }));
      } else {
        await apiClient.post(`/users/follow/${userId}`);
        setFollowingMap((prev) => ({ ...prev, [userId]: true }));
      }
    } catch (err) { alert("Action failed"); }
  };

  const toggleLike = async (post) => {
    // Check if current user already liked it
    const isLiked = post.likedBy.includes(currentUserId);
    try {
      if (isLiked) {
        await apiClient.post(`/posts/unlike/${post._id}`);
      } else {
        await apiClient.post(`/posts/like/${post._id}`);
      }
      refreshFeed(); // Refresh UI
    } catch (err) { console.error("Like failed"); }
  };

  return (
    <div className="feed-container">
      {posts.length === 0 && (
        <div style={{textAlign: "center", marginTop: "50px", color: "#8e8e8e"}}>
          <p>Your feed is empty.</p>
        </div>
      )}

      {posts.map((post) => {
        const isLiked = post.likedBy.includes(currentUserId);

        return (
          <div key={post._id} className="post-card">
            {/* Header */}
            <div className="post-header">
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                {/* User Avatar Icon */}
                <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#dbdbdb'}}></div>
                <div className="post-username">{post.owner.username}</div>
              </div>
              
              {/* Follow Button (Small Text) or Options Icon */}
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                 <button 
                  className={followingMap[post.owner._id] ? "btn-following" : "btn-follow"}
                  style={{ fontSize: '12px', padding: '4px 8px' }}
                  onClick={() => toggleFollow(post.owner._id)}
                >
                  {followingMap[post.owner._id] ? "Following" : "Follow"}
                </button>
                <FaEllipsisH style={{ color: '#262626', cursor: 'pointer' }} />
              </div>
            </div>

            {/* Image */}
            <img 
                src={post.imageLink} 
                alt="post" 
                className="post-image" 
                onError={(e) => {
                    // If the image fails to load, replace it with a gray placeholder
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/500x500?text=Image+Not+Found";
                }}
            />

            {/* Action Icons Row */}
            <div className="post-actions">
              <button className="action-btn" onClick={() => toggleLike(post)}>
                {isLiked ? (
                  <FaHeart size={24} color="#ed4956" /> // Red Heart if liked
                ) : (
                  <FaRegHeart size={24} color="#262626" /> // Outline if not
                )}
              </button>
              
              <button className="action-btn">
                <FaRegComment size={24} color="#262626" />
              </button>
              
              <button className="action-btn">
                <FaRegPaperPlane size={24} color="#262626" />
              </button>
            </div>

            {/* Likes Count */}
            <div className="post-likes">
              {post.likedBy.length} {post.likedBy.length === 1 ? 'like' : 'likes'}
            </div>

            {/* Caption */}
            <div className="post-caption">
              <span>{post.owner.username}</span>
              {post.captionText}
            </div>

            {/* Comment Input */}
            <div className="comment-input-area">
               <input 
                 className="comment-input" 
                 placeholder="Add a comment..." 
                 onKeyDown={async (e) => {
                   if (e.key === "Enter") {
                     await apiClient.post(`/posts/comment/${post._id}`, { message: e.target.value });
                     e.target.value = "";
                     refreshFeed();
                   }
                 }}
               />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
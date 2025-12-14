import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient.js";

const CreatePost = () => {
  const [imageLink, setImageLink] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [loading, setLoading] = useState(false); // To disable button while posting
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh

    if (!imageLink) {
      alert("Image URL is required");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("/posts/create", {
        imageLink,
        captionText,
      });

      navigate("/feed"); // Go to feed on success
    } catch (err) {
      alert("Failed to create post. Please check the URL or try again.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "0 15px" }}>
      
      {/* White Card Container */}
      <div className="post-card" style={{ padding: "30px" }}>
        <h2 style={{ textAlign: "center", margin: "0 0 20px 0", fontWeight: "600", color: "#262626" }}>
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          {/* Image URL Input */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
              Photo URL
            </label>
            <input
              className="auth-input"
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              required
            />
          </div>

          {/* Image Preview Area */}
          {imageLink && (
            <div style={{ 
              background: "#fafafa", 
              padding: "10px", 
              borderRadius: "4px", 
              border: "1px solid #dbdbdb",
              textAlign: "center" 
            }}>
              <img 
                src={imageLink} 
                alt="Preview" 
                style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "4px" }}
                onError={(e) => e.target.style.display = 'none'} // Hide if link is broken
              />
            </div>
          )}

          {/* Caption Input */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
              Caption
            </label>
            <textarea
              className="auth-input"
              rows="3"
              placeholder="Write a caption..."
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              style={{ fontFamily: "inherit", resize: "none" }}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ marginTop: "10px" }}
          >
            {loading ? "Sharing..." : "Share"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;
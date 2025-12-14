import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
// IMPORT ICONS
import { FaCamera, FaTh } from "react-icons/fa"; 

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    if (info) {
      setUser(JSON.parse(info));
    } else {
      navigate("/");
    }

    const fetchMyPosts = async () => {
      try {
        const res = await apiClient.get("/posts/mine");
        setMyPosts(res.data);
      } catch (err) {}
    };
    fetchMyPosts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: "935px", margin: "0 auto", padding: "30px 20px" }}>
      
      {/* HEADER */}
      <div className="profile-header" style={{ display: "flex", marginBottom: "44px", alignItems: "center" }}>
        
        {/* Avatar */}
        <div style={{ flexGrow: 1, marginRight: "30px", display: "flex", justifyContent: "center" }}>
          <div style={{ 
            width: "150px", 
            height: "150px", 
            borderRadius: "50%", 
            background: "#dbdbdb", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            color: "#ffffff"
          }}>
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div style={{ flexGrow: 2 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "300", margin: "0 20px 0 0" }}>{user.username}</h2>
            <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #dbdbdb", borderRadius: "4px", padding: "5px 9px", fontWeight: "600", cursor: "pointer" }}>
              Log Out
            </button>
          </div>

          <div style={{ display: "flex", gap: "40px", fontSize: "16px", marginBottom: "20px" }}>
            <span><b>{myPosts.length}</b> posts</span>
            <span><b>{user.followers ? user.followers.length : 0}</b> followers</span>
            <span><b>{user.following ? user.following.length : 0}</b> following</span>
          </div>
          
          <div>
            <div style={{ fontWeight: "600" }}>{user.email}</div>
          </div>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #dbdbdb", marginBottom: "0px" }} />

      {/* TABS (POSTS) */}
      <div style={{display: 'flex', justifyContent: 'center', gap: '60px', borderTop: '1px solid #dbdbdb'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid #262626', padding: '15px 0', marginTop: '-1px', color: '#262626', fontWeight: '600', fontSize: '12px', letterSpacing: '1px'}}>
          <FaTh size={12} /> POSTS
        </div>
      </div>

      {/* GRID */}
      <div className="profile-grid">
        {myPosts.length === 0 ? (
           <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "#262626" }}>
             <div style={{ border: '2px solid #262626', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto'}}>
                <FaCamera size={30} />
             </div>
             <h1 style={{fontSize: '28px', fontWeight: '300'}}>Share Photos</h1>
             <p>When you share photos, they will appear on your profile.</p>
           </div>
        ) : (
          myPosts.map((post) => (
            <div key={post._id} className="grid-item">
              <img src={post.imageLink} alt="post" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
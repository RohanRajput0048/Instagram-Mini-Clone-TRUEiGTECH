import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
// IMPORT ICON
import { FaUserCircle } from "react-icons/fa";

const FindPeople = () => {
  const [userList, setUserList] = useState([]);
  const [followingMap, setFollowingMap] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const myFollowing = storedUser.following || [];
    
    const initialMap = {};
    myFollowing.forEach(id => { initialMap[id] = true; });
    setFollowingMap(initialMap);

    const fetchUsers = async () => {
      try {
        const res = await apiClient.get("/users/all");
        const others = res.data.filter(u => u._id !== storedUser.id);
        setUserList(others);
      } catch (err) {}
    };
    fetchUsers();
  }, []);

  const toggleFollow = async (userId) => {
    const isFollowing = followingMap[userId];
    try {
      if (isFollowing) {
        await apiClient.post(`/users/unfollow/${userId}`);
        setFollowingMap(prev => ({ ...prev, [userId]: false }));
      } else {
        await apiClient.post(`/users/follow/${userId}`);
        setFollowingMap(prev => ({ ...prev, [userId]: true }));
      }
    } catch (err) { alert("Action failed"); }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h3 style={{marginBottom: '20px'}}>Suggested for you</h3>
      
      {userList.map((user) => (
        <div key={user._id} className="user-row" style={{borderBottom: 'none', padding: '12px 0'}}>
          
          {/* Left Side: Icon + Name */}
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <FaUserCircle size={40} color="#dbdbdb" />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{ fontWeight: "600", fontSize: '14px' }}>{user.username}</span>
              <span style={{ color: '#8e8e8e', fontSize: '12px' }}>Suggested for you</span>
            </div>
          </div>

          {/* Right Side: Button */}
          <button 
            onClick={() => toggleFollow(user._id)}
            style={{
              color: followingMap[user._id] ? "#262626" : "#0095f6",
              fontWeight: "600",
              fontSize: '12px',
              border: followingMap[user._id] ? "1px solid #dbdbdb" : "none",
              padding: followingMap[user._id] ? "5px 10px" : "0",
              background: 'transparent',
              borderRadius: '4px'
            }}
          >
            {followingMap[user._id] ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FindPeople;
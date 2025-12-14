import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Feed from "./pages/Feed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import FindPeople from "./pages/FindPeople.jsx";
import Profile from "./pages/Profile.jsx";
import "./App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/feed" className="nav-logo">InstagramClone</Link>
        <div className="nav-links">
          {/* Using Emojis as Icons for simplicity */}
          <Link to="/feed" className="nav-item">🏠</Link>
          <Link to="/find-people" className="nav-item">👥</Link>
          <Link to="/create" className="nav-item">➕</Link>
          <Link to="/profile" className="nav-item">👤</Link>
        </div>
      </div>
    </nav>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Navbar on Login and Signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/find-people" element={<FindPeople />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
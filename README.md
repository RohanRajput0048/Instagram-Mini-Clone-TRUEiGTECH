
Here is a professional, comprehensive README.md file tailored exactly to the project you just built. It covers all the requirements mentioned in the PDF (Setup, Database Design, API Design, and Features).
You can create a file named README.md in your main project folder and paste this code inside.
Instagram Mini Clone 📸
A full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). This project mimics core Instagram functionalities, allowing users to share photos via URLs, follow other users, and view a personalized feed.
🚀 Features
User Authentication: Secure Signup & Login using JWT (JSON Web Tokens) and bcrypt for password hashing.
Create Posts: Users can post images (via URL) with captions.
Feed System: Personalized feed showing posts only from users you follow, sorted by newest.
Interactions: Like and Unlike posts; add comments in real-time.
Follow System: Follow and Unfollow other users to curate your feed.
Profile Page: View your own posts, follower count, and following count.
Responsive UI: Instagram-like Sidebar navigation and responsive layout using React.
🛠️ Tech Stack
Frontend: React (Vite), React Router DOM, Axios, React Icons, CSS3.
Backend: Node.js, Express.js.
Database: MongoDB (Atlas), Mongoose.
Authentication: JWT, Bcryptjs.
Tools: Postman (for API testing), Git.


Instagram-Mini-Clone/
├── backend/            # Node.js & Express Server
│   ├── config/         # DB Connection
│   ├── controllers/    # Logic for Auth, Posts, Users
│   ├── models/         # Mongoose Schemas (User, Post)
│   ├── routes/         # API Endpoints
│   └── index.js        # Entry point
│
└── frontend/           # React Client
    ├── src/
    │   ├── pages/      # Feed, Login, Profile, etc.
    │   ├── services/   # Axios configuration
    │   └── App.jsx     # Main Component
    └── ...

⚙️ Installation & Setup
Follow these steps to run the project locally.
1. Prerequisites
Node.js installed (v14+ recommended)
MongoDB Atlas Account (Connection URI)
2. Clone the Repository
code
Bash
git clone https://github.com/YourUsername/Instagram-Mini-Clone.git
cd Instagram-Mini-Clone
3. Backend Setup
Navigate to the backend folder:
code
Bash
cd backend
Install dependencies:
code
Bash
npm install
Environment Variables: Create a .env file in the backend folder and add the following:
code
Env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key
Start the server:
code
Bash
npm run dev
# OR
node index.js
Server will run on http://localhost:5000
4. Frontend Setup
Open a new terminal and navigate to the frontend folder:
code
Bash
cd frontend
Install dependencies:
code
Bash
npm install
Start the React app:
code
Bash
npm run dev
Client will run on http://localhost:5173 (or similar)
🗄️ Database Design (Schema)
User Schema (User.js)
Field	Type	Description
username	String	Unique, Required
email	String	Unique, Required
password	String	Hashed (bcrypt)
followers	Array	ObjectId ref to User
following	Array	ObjectId ref to User
Post Schema (Post.js)
Field	Type	Description
owner	ObjectId	Ref to User (Creator)
imageLink	String	URL of the image
captionText	String	Post description
likedBy	Array	ObjectId ref to User
commentStack	Array	Array of objects { author, message }
createdAt	Date	Timestamp
🔌 API Design (Endpoints)
Authentication
POST /api/auth/signup - Register a new user.
POST /api/auth/login - Login and receive JWT.
Posts
POST /api/posts/create - Create a new post (Protected).
GET /api/posts/feed - Get posts from followed users (Protected).
GET /api/posts/mine - Get logged-in user's posts (Protected).
POST /api/posts/like/:id - Like a post.
POST /api/posts/unlike/:id - Unlike a post.
POST /api/posts/comment/:id - Add a comment.
Users
GET /api/users/all - Get list of all users.
POST /api/users/follow/:id - Follow a user.
POST /api/users/unfollow/:id - Unfollow a user.
🧪 Testing
Import the provided Postman Collection (if available) or use the endpoints above.
Auth Token: Most routes require a Bearer Token.
Login first.
Copy the token from the response.
In Postman headers: Authorization: Bearer <your_token>.
🛡️ License
This project is created for educational purposes.
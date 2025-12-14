import jwt from "jsonwebtoken";

const tokenGuard = (req, res, next) => {
  try {
    const authValue = req.headers.authorization;

    if (!authValue) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    // Expected format: Bearer <token>
    const splitToken = authValue.split(" ");

    if (splitToken.length !== 2) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    const actualToken = splitToken[1];

    const tokenData = jwt.verify(
      actualToken,
      process.env.JWT_SECRET
    );

    // attaching user info to request
    req.loggedInUser = tokenData.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token verification failed",
    });
  }
};

export default tokenGuard;

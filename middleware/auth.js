const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header.authorization;
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.header("authorization");
  console.log(token);
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized 12" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};


module.exports = authenticateToken;

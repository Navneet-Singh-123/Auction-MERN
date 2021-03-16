// JWTs are mainly used for authentication. After a user signs in to an application, 
// the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. 
// This token tells the server what routes, services, and resources the user is allowed to access.
const jwt = require("jsonwebtoken");
// Config module for global variables
const config = require("config");

module.exports = function (req, res, next) {
  // Token of the user is present in the headers under the key x-auth-token in this project
  const token = req.header("x-auth-token");
  // If the user token is not present then that means the user is not authenticated yet ie not logged in
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    // Otherwise obtain the user information from the token by decoding it
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Store the decoded user so that it can used in further api calls
    req.user = decoded.user;
    // this funcrion being a middleware has to execute the next() function to move to other authentication procedures
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

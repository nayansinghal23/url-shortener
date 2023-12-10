/*
// Statefull Authentication
const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}
*/

// Stateless Authentication
const jwt = require("jsonwebtoken");
const SECRET = "NAYAN@2003";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    SECRET
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, SECRET);
}

module.exports = {
  setUser,
  getUser,
};

const User = require("../models/user.js");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth.js");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are necessary" });
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "All fields are necessary" });
  }
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    return res.redirect("/login");
  }
  /*
  // Statefull
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  */

  // Stateless
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};

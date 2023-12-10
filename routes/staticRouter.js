const express = require("express");
const URL = require("../models/url.js");

const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { allUrls });
});

staticRouter.get("/signup", async (req, res) => {
  return res.render("signup");
});

staticRouter.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = staticRouter;

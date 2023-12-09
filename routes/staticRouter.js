const express = require("express");
const URL = require("../models/url.js");

const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { allUrls });
});

module.exports = staticRouter;

const shortId = require("shortid");
const URL = require("../models/url.js");

async function handleGenerateNewShortURL(req, res) {
  if (!req.body.url) {
    return res.status(400).send({ message: "Pass the URL" });
  }
  const shortID = shortId();
  await URL.create({
    shortId: shortID,
    redirectUrl: req.body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
}

async function handleAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  return res.status(200).send({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleAnalytics };

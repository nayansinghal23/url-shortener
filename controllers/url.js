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
  return res.status(200).send({ id: shortID });
}

async function handleAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.status(200).send({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleAnalytics };

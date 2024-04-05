import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required" });

  const shortId = nanoid(8);
  const result = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(201).render("home", { id: shortId });
}

export default generateNewShortURL;

export async function updateVisitHistory(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

export async function handleGetAnalytics(req, res, next) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

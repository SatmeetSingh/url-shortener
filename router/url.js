import express from "express";
import generateNewShortURL, {
  handleGetAnalytics,
  updateVisitHistory,
} from "../controllers/url.js";
import URL from "../models/url.model.js";

const router = express.Router();

router.post("/", generateNewShortURL);

router.get("/:shortId", updateVisitHistory);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;

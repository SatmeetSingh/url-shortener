import express from "express";
import dotenv from "dotenv";
import URL from "../models/url.model.js";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

export default router;

import { Router } from "express";
import { createShortUrl, getOriginalUrl } from "../controllers/shorturl.controller.js";

const router = Router();

router.post("/create-shorturl", createShortUrl);

router.get("/:shortlink_hash",getOriginalUrl)

export default router;

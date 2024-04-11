import urlShortenerService from "../models/url.model.js";
import { redisGet, redisSetEx } from "../services/redis.service.js";
import { generateShortLink, responseSend } from "../utils/server.util.js";

export const createShortUrl = async (req, res) => {
	try {
		const { original_url, expiry } = req.body;
		const currentTime = Date.now();
		if (expiry < currentTime)
			return responseSend(res, 400, {
				success: false,
				message: "Shortlink expiry time should be greater than the current time",
				data: null,
			});
		const isUrlActive = await urlShortenerService.readOneDocument({
			"url.original": original_url,
			is_active: true,
		});
		if (isUrlActive)
			return responseSend(res, 400, {
				success: false,
				message: "Url is already active",
			});

		const { alias, hash } = generateShortLink();
		const insertData = {
			url: {
				alias,
				original: original_url,
				hash,
			},
			expire_at: expiry,
		};
		const shortlinkData = await urlShortenerService.createDocument(insertData);
		const timeDifference = Math.floor((expiry - currentTime) / 1000);
		const cacheKey = `shortlink:${hash}`;
		console.log(timeDifference);
		await redisSetEx(cacheKey, JSON.stringify(shortlinkData), timeDifference);
		return responseSend(res, 201, {
			success: true,
			message: "Shortlink created",
			data: shortlinkData,
		});
	} catch (error) {
		return responseSend(res, 400, {
			success: false,
			message: error.message,
			data: null,
		});
	}
};

export const getOriginalUrl = async (req, res) => {
	try {
		const { shortlink_hash } = req.params;
		const cacheKey = `shortlink:${shortlink_hash}`;
		const cachedData = await redisGet(cacheKey);
		const filter = {
			"url.hash": shortlink_hash,
			is_active: true,
		};
		if (cachedData) {
			const updatedData = await urlShortenerService.updateDocument(filter, {
				$inc: {
					count: 1,
				},
			});
			const parseShortlinkData = JSON.parse(cachedData);
			return res.redirect(parseShortlinkData.url.original);
		}

		const shortlinkData = await urlShortenerService.readOneDocument(filter);
		if (!shortlinkData) return res.send("shortlink expired");

		const currentTime = Date.now();
		if (shortlinkData.expire_at < currentTime) {
			await urlShortenerService.updateDocument(filter, {
				$set: {
					is_active: false,
				},
			});
			return res.send("shortlink expired");
		}
		await urlShortenerService.updateDocument(filter, {
			$inc: {
				count: 1,
			},
		});
		const timeDifference = Math.floor((shortlinkData.expire_at - currentTime) / 1000);

		await redisSetEx(cacheKey, JSON.stringify(shortlinkData), timeDifference);

		return res.redirect(shortlinkData.url.original);
	} catch (error) {
		return responseSend(res, 400, {
			success: false,
			message: error.message,
			data: null,
		});
	}
};

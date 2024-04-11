import { customAlphabet } from "nanoid";
import config from "../config/env.config.js";

export const responseSend = (res, statusCode, { success, message, data }) => {
	return res.status(statusCode).send({
		success,
		message,
		data,
	});
};

export const generateShortLink = () => {
	const hashAlphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const customAlphabetHash = customAlphabet(hashAlphabets, 6)();
	const hash = customAlphabetHash;
	return { alias: `${config.shortlink_domain}/${hash}`, hash };
};

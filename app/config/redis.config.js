import Redis from "ioredis";
import config from "./env.config.js";
import logger from "./logger.config.js";

const redis = new Redis(config.redis.host);

redis.on("connect", () => {
	logger.info("Connected to Redis server");
});

redis.on("error", (err) => {
	logger.error("Redis error line 12", err);
});

redis.on("reconnecting", () => {
	logger.info("Attempting to reconnect to Redis server");
});

redis.on("end", () => {
	logger.info("Connection to Redis server has ended");
});


export default redis;

import mongoose from "mongoose";
import logger from "./logger.config.js";
import config from "./env.config.js";

(async () => {
	mongoose.connect(config.mongodb.host);
	mongoose.connection.on("connected", () => {
		logger.info("MongoDB connected successfully");
	});
	mongoose.connection.on("error", (error) => {
		logger.error("MongoDB connection error:", error);
	});
	mongoose.connection.on("disconnected", () => {
		logger.info("MongoDB disconnected");
	});
})();

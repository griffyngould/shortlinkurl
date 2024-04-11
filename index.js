import config from "./app/config/env.config.js";
import express from "express";
import logger from "./app/config/logger.config.js";
import "./app/config/mongo.config.js";
import "./app/config/redis.config.js";
import shortUrlRouter from "./app/routes/shorturl.route.js";

const PORT = config.port;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
	logger.info(`App is listening to port ${PORT}`);
});

app.use(shortUrlRouter);

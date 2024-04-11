import convict from "convict";

const config = convict({
	env: {
		doc: "The application environment",
		default: "development",
		env: "NODE_ENV",
	},
	port: {
		doc: "The port to bind",
		default: 8080,
		env: "PORT",
	},
	mongodb: {
		host: {
			doc: "Database connection URI",
			default: "mongodb://127.0.0.1:27021/url-shortener",
			env: "MONGODB_URI",
		},
	},
	redis: {
		host: {
			doc: "Redis connection",
			default: "redis://localhost:6361",
			env: "REDIS_URI",
		},
	},
	shortlink_domain: {
		doc: "Shortlink domain value",
		default: "http://localhost:8080",
		env: "SHORTLINK_DOMAIN",
	},
});

config.validate({ allowed: "strict" });

export default config.get();

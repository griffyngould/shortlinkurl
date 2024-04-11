import mongoose from "mongoose";
import MongoDbService from "../services/mongodb.service.js";

const urlSchema = mongoose.Schema(
	{
		url: {
			alias: {
				type: String,
				required: true,
				unique: true,
			},
			original: {
				type: String,
			},
			hash: {
				type: String,
				required: true,
				unique: true,
			},
		},
		expire_at: {
			type: Number,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		count: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const urlModel = mongoose.model("short_links", urlSchema);

const urlShortenerService = new MongoDbService(urlModel);

export default urlShortenerService;

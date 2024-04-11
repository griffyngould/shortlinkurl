class MongoDbService {
	constructor(model) {
		this.model = model;
	}
	async createDocument(insertData) {
		try {
			const document = new this.model(insertData);
			return await document.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	async readOneDocument(filter, select = {}) {
		try {
			const document = await this.model.findOne(filter).select(select).lean();

			return document;
		} catch (error) {
			throw new Error(error);
		}
	}
	async updateDocument(filter, updateQuery, options = {}) {
		try {
			let { populate, ...updateOptions } = options;
			populate = populate || "";
			const document = await this.model
				.findOneAndUpdate(filter, updateQuery, {
					new: true,
					runValidators: true,
					...updateOptions,
				})
				.populate(populate)
				.lean();
			return document;
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default MongoDbService;

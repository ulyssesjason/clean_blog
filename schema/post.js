// Post Schema


var mongoose = require('mongoose');

var post_schema = mongoose.Schema({
	title : String,
	author : String,
	content: String,
	brief : String,
	tag : [String],
	category : String,	// change to category schema
	meta : {
		createdAt : {
			type : Date,
			default : Date.now()
		},
		createdBy : String,		// pending, to user schema
		updatedAt : {
			type : Date,
			default : Date.now()
		},
		updatedBy : String	// user
	}
});

post_schema.pre('save', function(next){
	if(this.isNew){
		this.meta.createdAt = this.meta.updatedAt;
	}else{
		this.meta.updatedAt = Date.now();
	}

	next();
});

post_schema.statics = {
	listAllByUpdated : function(callback){
		return this
			.find({})
			.sort('meta.updatedAt')
			.exec(callback);
	},
	findById : function(id, callback){
		return this
			.findOne({_id: id})
			.exec(callback);
	}

}

module.exports = post_schema;
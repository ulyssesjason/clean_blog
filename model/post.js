// Post Model

var mongoose = require('mongoose');

var post_schema = require('../schema/post');

var post = mongoose.model('post', post_schema);

module.exports = post;
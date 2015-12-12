var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    body: {
        type: String
    },
    date: {
        type: Date
    },
    source: {
        type: String
    },
    previewImg: {
        type: String
    },
});

module.exports = mongoose.model('Story', model);
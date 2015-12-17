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

model.path('title').validate(function (value) {
    return value !== null;
}, 'Invalid title');

model.path('summary').validate(function (value) {
    return value !== null;
}, 'Invalid summary');

model.path('date').validate(function (value) {
    return value !== null;
}, 'Invalid date');

model.path('source').validate(function (value) {
    return value !== null;
}, 'Invalid source');

module.exports = mongoose.model('Story', model);
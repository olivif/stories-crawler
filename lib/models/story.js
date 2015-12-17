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

var Story = mongoose.model('Story', model);

Story.createInstance = function(title, summary, body, date, source, previewImg) {
    return new Story({
        title: title,
        summary: summary,
        body: body,
        date: date,
        source: source,
        previewImg: previewImg
    }); 
}

module.exports = Story;
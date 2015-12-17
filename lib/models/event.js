var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    type: {
        type: String
    },
    date: {
        type: Date
    }
});

model.path('type').validate(function (value) {
    return value !== null && value === "LastUpdated";
}, 'Invalid type');

model.path('date').validate(function (value) {
    return value !== null && value < new Date();
}, 'Invalid date');

var Event = mongoose.model('Event', model);

Event.createInstance = function(type, date) {
    return new Event({
        type: type,
        date: date
    }); 
}

module.exports = Event;
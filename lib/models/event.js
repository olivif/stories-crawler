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

module.exports = mongoose.model('Event', model);
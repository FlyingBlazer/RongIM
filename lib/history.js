var api = require('./api').message.history;
var request = require('./request');

exports.get = function(date, callback) {
    request.request(api.get, {
        date: date
    }, callback);
};

exports.del = function(date, callback) {
    request.request(api.del, {
        date: date
    }, callback);
};
var api = require('./api').user.blackList;
var request = require('./request');

exports.add = function(userId, blackUserId, callback) {
    request.request(api.add, {
        userId: userId,
        blackUserId: blackUserId
    }, callback);
};

exports.remove = function(userId, blackUserId, callback) {
    request.request(api.remove, {
        userId: userId,
        blackUserId: blackUserId
    }, callback);
};

exports.query = function(userId, callback) {
    request.request(api.query, {
        userId: userId
    }, callback);
};
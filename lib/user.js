var api = require('./api').user;
var request = require('./request');

exports.getToken = function(userId, name, portraitUri, callback) {
    request.request(api.getToken, {
        userId: userId,
        name: name,
        portraitUri: portraitUri
    }, callback);
};

exports.refresh = function(userId, name, portraitUri, callback){
    request.request(api.refresh, {
        userId: userId,
        name: name,
        portraitUri:portraitUri
    }, callback);
};

exports.checkOnline = function(userId, callback) {
    request.request(api.checkOnline, {
        userId:userId
    }, callback);
};

exports.block = function(userId, minute, callback) {
    request.request(api.block, {
        userId: userId,
        minute: minute
    }, callback);
};

exports.unblock = function(userId, callback) {
    request.request(api.unblock, {
        userId: userId
    }, callback);
};

exports.queryBlock = function(userId, callback) {
    request.request(api.queryBlock, {}, callback);
};

exports.blackList = require('./blackList');
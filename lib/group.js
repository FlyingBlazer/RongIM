var api = require('./api').group;
var request = require('./request');

exports.sync = function(userId, groups, callback){
    var params = {
        userId:userId
    };
    if (groups){
        for (var g in groups) {
            params[g] = groups[g];
        }
    }
    request.request(api.sync, params, callback);
};

exports.create = function(userId, groupId, groupName, callback){
    request.request(api.create, {
        userId: userId,
        groupId: groupId,
        groupName: groupName
    }, callback);
};

exports.join = function(userId, groupId, groupName, callback){
    request.request(api.join, {
        userId:userId,
        groupId:groupId,
        groupName:groupName
    }, callback);
};

exports.quit = function(userId, groupId, callback){
    request.request(api.quit, {
        userId:userId,
        groupId:groupId
    }, callback);
};

exports.dismiss = function(userId, groupId, callback){
    request.request(api.dismiss, {
        userId:userId,
        groupId:groupId
    }, callback);
};

exports.refresh = function(groupId, groupName, callback){
    request.request(api.refresh, {
        groupId:groupId,
        groupName:groupName
    }, callback);
};
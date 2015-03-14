var api = require('./api').chatroom;
var request = require('./request');

exports.create = function(id, name, callback){
    var param = {};
    if(typeof name == 'function') {
        callback = name;
        for(var key in id) {
            param["chatroom[" + key + "]"] = id[key];
        }
    } else {
        param["chatroom[" + id + "]"] = name;
    }
    request.request(api.create, param, callback);
};

exports.destroy = function(chatroomId, callback){
    request.request(api.destroy, {
        chatroomId:chatroomId
    }, callback);
};

exports.query = function(chatroomId, callback){
    request.request(api.query, {
        chatroomId:chatroomId
    }, callback);
};
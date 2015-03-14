var api = require('./api').user;
var request = require('./request');
var SystemId = 'ffffffffffffffffffffffffffffff';

exports.setSystemId = function(id) {
    SystemId = id;
};

exports.private = function(fromUserId, toUserId, message, pushContent, pushData, callback){
    if(typeof pushContent == 'function') {
        callback = pushContent;
        pushContent = '';
        pushData = '';
    }
    if(typeof pushData == 'function') {
        callback = pushData;
        pushData = '';
    }
    request.request(api.private, {
        fromUserId: fromUserId,
        toUserId: toUserId,
        objectName: message.objectName,
        content: message.content,
        pushContent: pushContent,
        pushData: pushData
    }, callback);
};

exports.system = function(toUserId, message, pushContent, pushData, callback) {
    if(typeof pushContent == 'function') {
        callback = pushContent;
        pushContent = '';
        pushData = '';
    }
    if(typeof pushData == 'function') {
        callback = pushData;
        pushData = '';
    }
    request.request(api.system, {
        fromUserId: SystemId,
        toUserId: toUserId,
        objectName: message.objectName,
        content: message.content,
        pushContent: pushContent,
        pushData: pushData
    }, callback);
};

exports.group = function(fromUserId, toGroupId, message, pushContent, pushData, callback){
    if(typeof pushContent == 'function') {
        callback = pushContent;
        pushContent = '';
        pushData = '';
    }
    if(typeof pushData == 'function') {
        callback = pushData;
        pushData = '';
    }
    request.request(api.group, {
        fromUserId: fromUserId,
        toGroupId: toGroupId,
        objectName: message.objectName,
        content: message.content,
        pushContent: pushContent,
        pushData: pushData
    }, callback);
};

exports.chatroom = function(fromUserId, toChatroomId, message, callback){
    request.request(api.chatroom, {
        fromUserId: fromUserId,
        toChatroomId: toChatroomId,
        objectName: message.objectName,
        content: message.content
    }, callback);
};

exports.broadcast = function(fromUserId, message, callback){
    request.request(api.broadcast, {
        fromUserId: fromUserId,
        objectName: message.objectName,
        content: message.content
    }, callback);
};

exports.history = require('./history');

exports.registerCustomType = function(name, id, generator) {
    if(messageType[name]) {
        return -1;
    }
    messageType[name] = id;
    var _name = name.substr(0, 1).toUpperCase().concat(name.substr(1));
    exports['makeup' + _name] = function() {
        return {
            objectName: id,
            content: generator.apply(this, arguments)
        };
    };
};

exports.makeupText = function(content, extra) {
    return {
        objectName: 'RC:TxtMsg',
        content: JSON.stringify({
            content: content,
            extra: extra
        })
    };
};

exports.makeupImage = function(content, imageUri, extra) {
    return {
        objectName: 'RC:ImgMsg',
        content: JSON.stringify({
            content: content,
            imageUri: imageUri,
            extra: extra
        })
    };
};

exports.makeupVoice = function(content, duration, extra) {
    return {
        objectName: 'RC:VcMsg',
        content: JSON.stringify({
            content: content,
            duration: duration,
            extra: extra
        })
    };
};

exports.makeupImageText = function(title, content, imageUri, extra) {
    return {
        objectName: 'RC:VcMsg',
        content: JSON.stringify({
            title: title,
            content: content,
            imageUri: imageUri,
            extra: extra
        })
    };
};

exports.makeupLBS = function(content, latitude, longitude, poi, extra) {
    return {
        objectName: 'RC:VcMsg',
        content: JSON.stringify({
            content: content,
            latitude: latitude,
            longitude: longitude,
            poi: poi,
            extra: extra
        })
    };
};

exports.makeupContact = function(operation, sourceUserId, targetUserId, message, extra) {
    return {
        objectName: 'RC:VcMsg',
        content: JSON.stringify({
            operation: operation,
            sourceUserId: sourceUserId,
            targetUserId: targetUserId,
            message: message,
            extra: extra
        })
    };
};

exports.type = messageType;

var messageType = {
    text: 'RC:TxtMsg',
    image: 'RC:ImgMsg',
    voice: 'RC:VcMsg',
    imageText: 'RC:ImgTextMsg',
    lbs: 'RC:LBSMsg',
    contact: 'RC:ContactNtf'
};
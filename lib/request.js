var request = require('request');
var crypto = require('crypto');
var RongIMError = require('./RongIMError');

var AppKey,
    AppSecret,
    ServerApiUrl = 'https://api.cn.rong.io';

exports.init = function(AK, AS) {
    AppKey = AK;
    AppSecret = AS;
};

exports.request = function(api, params, callback) {
    if(arguments.length == 2) {
        callback = function(err) {
            if(err) throw err;
        };
    }

    getBaseRequest().post(ServerApiUrl + api + '.json', {
        form: params
    }, responseHandler(callback));
};

function getBaseRequest() {
    var shasum = crypto.createHash('sha1');
    var nonce = Math.floor(Math.random() * 0xffffff).toString();
    var timestamp = Math.floor(new Date().getTime()/1000);
    shasum.update(AppSecret + nonce + timestamp);
    var signature =shasum.digest('hex');
    return request.defaults({
        headers: {
            'App-Key': AppKey,
            'Nonce': nonce,
            'Timestamp': timestamp,
            'Signature': signature
        }
    });
}

function responseHandler(cb) {
    return function(err, response, body) {
        if(err) {
            return cb(err);
        }
        body = JSON.parse(body);
        if(response.statusCode != 200) {
            return cb(new RongIMError(body.code));
        }
        cb(null, body);
    };
}
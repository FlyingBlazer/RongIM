var util = require('util');

var RongIMError = function(code, message) {
    message = message || messageMap[code];
    this.code = code;
    this.message = message;
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
};
util.inherits(RongIMError, Error);

RongIMError.prototype.name        = 'RongIMError';
RongIMError.prototype.toString    = function () {
    return '[RongIMError ' + this.code + ': ' + this.message + ']';
};

var messageMap = {
    1000: '服务内部错误',
    1001: 'App Secret 错误',
    1002: '参数错误',
    1003: '无 POST 数据',
    1004: '验证签名错误',
    1005: '参数长度超限',
    1006: 'App 被锁定或删除',
    1007: '被限制调用',
    1008: '调用频率超限',
    1050: '内部服务超时',
    2007: '测试用户数量超限'
};

exports = module.exports = RongIMError;
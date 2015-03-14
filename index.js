var request = require('./lib/request');

exports = module.exports = {
    init: request.init,
    test: function() {
        request.test();
    },
    user: require('./lib/user'),
    group: require('./lib/group'),
    chatroom: require('./lib/chatroom'),
    message: require('./lib/message'),
    api: require('./lib/api')
};

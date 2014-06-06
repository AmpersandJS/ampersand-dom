var tape = require('tape');
function suite (name, cb) {
    var beforeEach = [];
    var afterEach = [];

    var suite = {
        beforeEach: function (cb) {
            beforeEach.push(cb);
        },
        afterEach: function (cb) {
            afterEach.push(cb);
        },
        test: function (name, cb) {
            tape(name, function (t) {
                beforeEach.forEach(function (fn) { fn(); });
                cb(t);
                afterEach.forEach(function (fn) { fn(); });
            });
        }
    };

    suite.test.only = function (name, cb) {
        tape.only(name, function (t) {
            beforeEach.forEach(function (fn) { fn(); });
            cb(t);
            afterEach.forEach(function (fn) { fn(); });
        });
    };

    cb(suite);
}

module.exports = suite;

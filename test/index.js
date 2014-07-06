var suite = require('tape-suite');
var dom = require('../ampersand-dom');

var fixture = document.createElement('div');
fixture.id = 'fixture';
document.body.appendChild(fixture);

var style = document.createElement('style');
style.innerHTML = '';
document.body.appendChild(style);

function setStyle(str) {
    style.innerHTML = str;
}

var normalizeString = function (str) {
    return str.trim().replace(/\s+/g, ' ');
};

var resetFixture = function () {
    fixture.innerHTML = '';
    style.innerHTML = '';
};

suite('text', function (s) {
    s.beforeEach(resetFixture);

    s.test('on div', function (t) {
        dom.text(fixture, 'hello');
        t.equal(fixture.innerHTML, 'hello');
        t.end();
    });

    s.test('falsy values', function(t) {
        dom.text(fixture, 0);
        t.equal(fixture.innerHTML, '0');

        dom.text(fixture, undefined);
        t.equal(fixture.innerHTML, '');

        dom.text(fixture, null);
        t.equal(fixture.innerHTML, '');

        dom.text(fixture, NaN);
        t.equal(fixture.innerHTML, '');

        dom.text(fixture, false);
        t.equal(fixture.innerHTML, '');

        t.end();
    });

    s.test('on text node', function (t) {
        var node1 = document.createTextNode('hello');
        var node2 = document.createTextNode('there');
        fixture.appendChild(node1);
        fixture.appendChild(node2);

        t.equal(fixture.innerHTML, 'hellothere');

        dom.text(node1, 'foo');
        t.equal(fixture.innerHTML, 'foothere');

        dom.text(node2, 'bar');
        t.equal(fixture.innerHTML, 'foobar');

        t.end();
    });
});

suite('classes', function (s) {
    s.beforeEach(resetFixture);

    s.test('add/switch/remove classes', function (t) {
        dom.addClass(fixture, 'foo');
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo');
        t.ok(dom.hasClass(fixture, 'foo'));

        dom.addClass(fixture, 'bar');
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo bar');
        t.ok(dom.hasClass(fixture, 'foo'));
        t.ok(dom.hasClass(fixture, 'bar'));

        dom.addClass(fixture, 'bar');
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo bar');
        t.ok(dom.hasClass(fixture, 'foo'));
        t.ok(dom.hasClass(fixture, 'bar'));

        dom.switchClass(fixture, 'bar', 'baz');
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo baz');
        t.ok(dom.hasClass(fixture, 'foo'));
        t.notOk(dom.hasClass(fixture, 'bar'));
        t.ok(dom.hasClass(fixture, 'baz'));

        dom.removeClass(fixture, 'baz');
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo');
        t.ok(dom.hasClass(fixture, 'foo'));
        t.notOk(dom.hasClass(fixture, 'bar'));
        t.notOk(dom.hasClass(fixture, 'baz'));

        dom.removeClass(fixture, 'foo');
        t.equal(normalizeString(fixture.getAttribute('class')), '');
        t.notOk(dom.hasClass(fixture, 'foo'));
        t.notOk(dom.hasClass(fixture, 'bar'));
        t.notOk(dom.hasClass(fixture, 'baz'));

        dom.removeClass(fixture, 'foo');
        t.equal(normalizeString(fixture.getAttribute('class')), '');
        t.notOk(dom.hasClass(fixture, 'foo'));
        t.notOk(dom.hasClass(fixture, 'bar'));
        t.notOk(dom.hasClass(fixture, 'baz'));

        t.end();
    });
});

suite('attributes', function (s) {
    s.beforeEach(resetFixture);

    s.test('add/remove non-value attribute', function (t) {
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        fixture.appendChild(input);

        dom.addAttribute(input, 'checked');
        t.equal(input.checked, true);

        dom.removeAttribute(input, 'checked');
        t.equal(input.checked, false);

        t.end();
    });

    s.test('set/get/remove', function (t) {
        dom.setAttribute(fixture, 'foo', 'bar');
        t.equal(fixture.getAttribute('foo'), 'bar');

        t.equal(dom.getAttribute(fixture, 'foo'), 'bar');

        dom.removeAttribute(fixture, 'foo');
        t.notOk(fixture.getAttribute('foo'));

        t.end();
    });
});

function isHidden(el) {
    if (el.style.display === 'none') return true;
    if (window.getComputedStyle(el).display === 'none') return true;
    return false;
}

suite('show/hide', function (s) {
    s.beforeEach(resetFixture);
    var el;

    s.beforeEach(function () {
        el = document.createElement('div');
        el.appendChild(document.createTextNode('foo'));
        window.F = el;
        fixture.appendChild(el);
    });

    s.test('simple', function (t) {
        t.notOk(isHidden(el));

        dom.hide(el);
        t.ok(isHidden(el));

        dom.show(el);
        t.notOk(isHidden(el));

        t.end();
    });

    s.test('simple', function (t) {
        t.notOk(isHidden(el));

        dom.hide(el);
        t.ok(isHidden(el));

        dom.hide(el);
        t.ok(isHidden(el));

        dom.show(el);
        t.notOk(isHidden(el));

        t.end();
    });

    s.test('with stylesheet', function (t) {
        setStyle("#fixture div { display: table; }");

        var s = window.getComputedStyle(el);
        t.equal(s.getPropertyValue('display'), 'table');

        dom.hide(el);
        t.ok(isHidden(el));

        dom.show(el);
        t.notOk(isHidden(el));
        t.equal(s.getPropertyValue('display'), 'table');

        t.end();
    });

    s.test('with display property previously set via style', function (t) {
        el.style.display = 'table';
        t.equal(el.style.display, 'table');

        dom.hide(el);
        t.ok(isHidden(el));

        dom.show(el);
        t.notOk(isHidden(el));
        t.equal(el.style.display, 'table');

        t.end();
    });
});

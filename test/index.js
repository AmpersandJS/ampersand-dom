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

        dom.addClass(fixture, ['foo2', 'bar2'])
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo bar foo2 bar2');
        t.ok(dom.hasClass(fixture, 'foo2'));
        t.ok(dom.hasClass(fixture, 'bar2'));

        dom.removeClass(fixture, ['foo2', 'bar2'])
        t.equal(normalizeString(fixture.getAttribute('class')), 'foo bar');
        t.ok(!dom.hasClass(fixture, 'foo2'));
        t.ok(!dom.hasClass(fixture, 'bar2'));

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

        t.doesNotThrow(function () {
            dom.removeClass(fixture, '');
        }, 'should not complain when removing empty class');

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
        t.ok(input.hasAttribute('checked'));

        dom.removeAttribute(input, 'checked');
        t.equal(input.checked, false);
        t.ok(!input.hasAttribute('checked'));

        dom.addAttribute(input, 'disabled');
        t.equal(input.disabled, true);
        t.ok(input.hasAttribute('disabled'));

        console.log(input.outerHTML);

        dom.removeAttribute(input, 'disabled');
        t.equal(input.disabled, false);
        t.ok(!input.hasAttribute('disabled'));


        t.end();
    });

    s.test('add/remove boolean attribute', function (t) {
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

    s.test('has attribute', function (t) {
        t.notOk(dom.hasAttribute(fixture, 'foo'));

        dom.setAttribute(fixture, 'foo', 'bar');
        t.ok(dom.hasAttribute(fixture, 'foo'));

        dom.removeAttribute(fixture, 'foo');
        t.notOk(dom.hasAttribute(fixture, 'foo'));

        t.end();
    });

    s.test('has boolean attribute', function (t) {
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        fixture.appendChild(input);

        t.notOk(dom.hasAttribute(fixture, 'checked'));

        dom.addAttribute(input, 'foo');
        t.ok(dom.hasAttribute(input, 'foo'));

        dom.removeAttribute(input, 'foo');
        t.notOk(dom.hasAttribute(input, 'foo'));

        t.end();
    });
});

function isHidden(el, visibility) {
    if (visibility) {
        if (el.style.visibility === 'hidden') return true;
        if (window.getComputedStyle(el).visibility === 'hidden') return true;
        return false;
    } else {
        if (el.style.display === 'none') return true;
        if (window.getComputedStyle(el).display === 'none') return true;
        return false;
    }
}

suite('show/hide/toggle', function (s) {
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

    s.test('double', function (t) {
        t.notOk(isHidden(el));

        dom.hide(el);
        t.ok(isHidden(el));

        dom.hide(el);
        t.ok(isHidden(el));

        dom.show(el);
        t.notOk(isHidden(el));

        dom.show(el);
        t.notOk(isHidden(el));

        t.end();
    });

    s.test('toggle', function (t) {
        t.notOk(isHidden(el), 'el starts out not hidden');

        dom.toggle(el);
        t.ok(isHidden(el), 'el toggles to hidden');

        dom.toggle(el);
        t.notOk(isHidden(el), 'el toggles back to not hidden');

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

        dom.toggle(el);
        t.ok(isHidden(el));

        dom.toggle(el);
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

        dom.toggle(el);
        t.ok(isHidden(el));

        dom.toggle(el);
        t.notOk(isHidden(el));
        t.equal(el.style.display, 'table');

        t.end();
    });

    s.test('with use of visibility property', function (t) {
        t.notOk(isHidden(el, true), 'should not have a visibility property to start with');

        dom.hide(el, 'visibility');
        t.ok(isHidden(el, true), 'should have visibility set to hidden');

        dom.show(el, 'visibility');
        t.notOk(isHidden(el, true), 'should have visibility set back to previous property');

        t.end();
    });
});

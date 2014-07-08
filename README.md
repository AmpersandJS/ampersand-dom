# ampersand-dom

Minimal util-layer for applying transformations to DOM.

It's a pretty thin layer on top of DOM APIs.

It has zero dependencies.

## install

```
npm install ampersand-dom
```

## browser support
[![testling badge](https://ci.testling.com/AmpersandJS/ampersand-dom.png)](https://ci.testling.com/AmpersandJS/ampersand-dom)

## falsy values

When setting something to a falsy value: `NaN`, `undefined`, `null`, and `false` all become `''`. However, `0` becomes `"0"` in order to allow setting `0` as the text content of an element.

## example

Here are all the methods and their usage:

```javascript

var dom = require('ampersand-dom');


// sets text content of element
dom.text(el, 'set text content');

// uses classList if available
dom.addClass(el, 'someclass');
dom.hasClass(el, 'someclass'); // => true
dom.removeClass(el, 'someclass');

// removes old if found, adds new
dom.switchClass(el, 'oldclass', 'newclass');

// makes sure attribute (with no content) is added
// if exists it will be cleared of content
dom.addAttribute(el, 'checked');

// completely removes attribute
dom.removeAttribute(el, 'checked');

// sets attribute to string value given, clearing any current value
dom.setAttribute(el, 'value', 'the value');

// sets display none
dom.hide(el);

// shows element, trying to determine it's default display state
// based on tagname and getComputedStyle()
dom.show(el);

// sets inner HTML, takes string or DOM
dom.html(el, '<div></div>');
```

## credits

Initially created by [@HenrikJoreteg](http://twitter.com/henrikjoreteg) with much inspiration/discussion with [@philip_roberts](https://twitter.com/philip_roberts).

## license

MIT


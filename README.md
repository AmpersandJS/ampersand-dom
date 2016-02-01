# ampersand-dom

Minimal util-layer for applying transformations to DOM.

It's a pretty thin layer on top of DOM APIs.

It has zero dependencies.

## install

```
npm install ampersand-dom
```

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

// returns true if that the element has an attribute with that name
dom.hasAttribute(el, 'checked'); // => true

// completely removes attribute
dom.removeAttribute(el, 'checked');

// sets attribute to string value given, clearing any current value
dom.setAttribute(el, 'value', 'the value');

// sets display none
dom.hide(el);

// hide takes a second parameter which changes
// the css property used to hide the element
// sets visibility hidden
dom.hide(el, 'visibility');

// shows element, trying to determine it's default display state
// based on tagname and getComputedStyle()
dom.show(el);

// show also takes a second parameter which changes
// the css property used to show the element
// sets visibility on element based on its previous value
dom.show(el, 'visibility');

// toggle display of element, between show/hide
dom.toggle(el);

// toggle also takes the same second parameter as show/hide
// which changes the css property used to show or hide
// the element
dom.toggle(el, 'visibility');

// sets inner HTML, takes string or DOM
dom.html(el, '<div></div>');
```

## credits

Initially created by [@HenrikJoreteg](http://twitter.com/henrikjoreteg) with much inspiration/discussion with [@philip_roberts](https://twitter.com/philip_roberts).

## license

MIT


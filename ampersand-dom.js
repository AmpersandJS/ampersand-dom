module.exports = {
    text: function (el, val) {
        el.textContent = getString(val);
    },
    // optimize if we have classList
    addClass: function (el) {
        if (el.classList) {
            el.classList.add(getString(cls));
        } else {
            if (!hasClass(el, cls)) {
                if (el.classList) {
                    el.classList.add(cls);
                } else {
                    el.className += ' ' + cls;
                }
            }
        }
    },
    removeClass: function (el, cls) {
        if (el.classList) {
            el.classList.remove(getString(cls));
        } else {
            // may be faster to not edit unless we know we have it?
            el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    switchClass: function (el, prevCls, newCls) {
        if (prevCls) this.removeClass(el, prevCls);
        this.addClass(el, newCls);
    },
    // makes sure attribute (with no content) is added
    // if exists it will be cleared of content
    addAttribute: function (el, attr) {
        // setting to empty string does same
        el.setAttribute(attr, '');
    },
    // completely removes attribute
    removeAttribute: function (el, attr) {
        el.removeAttribute(attr);
    },
    // sets attribute to string value given, clearing any current value
    setAttribute: function (el, attr, value) {
        el.setAttribute(attr, getString(value));
    },
    hide: function (el) {
        el.style.display = 'none';
    },
    // show element
    show: function (el) {
        el.style.display = defaultDisplay(el.nodeName) || 'block';
    },
    html: function (el, content) {
        el.innerHTML = content;
    }
};

// helpers
function getString(val) {
    if (!val) {
        return '';
    } else {
        return val;
    }
}

function hasClass(el, cls) {
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
    }
}

var getComputedStyle = window.getComputedStyle || function () {}();
var elementDisplay = {};

// figures out and caches default display style for a node type
// used for showing/hiding
function defaultDisplay(nodeName) {
    var element, display, style;
    if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        style = getComputedStyle(element, '');
        display = style && style.getPropertyValue('display') || 'block';
        element.parentNode.removeChild(element);
        display == "none" && (display = "block");
        elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName];
}

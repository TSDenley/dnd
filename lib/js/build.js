(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, Context, Transparency, helpers, _,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('../lib/lodash.js');

helpers = require('./helpers');

Context = require('./context');

Transparency = {};

Transparency.render = function(context, models, directives, options) {
  var log, _base;
  if (models == null) {
    models = [];
  }
  if (directives == null) {
    directives = {};
  }
  if (options == null) {
    options = {};
  }
  log = options.debug && console ? helpers.consoleLogger : helpers.nullLogger;
  log("Transparency.render:", context, models, directives, options);
  if (!context) {
    return;
  }
  if (!_.isArray(models)) {
    models = [models];
  }
  context = (_base = helpers.data(context)).context || (_base.context = new Context(context, Transparency));
  return context.render(models, directives, options).el;
};

Transparency.matcher = function(element, key) {
  return element.el.id === key || __indexOf.call(element.classNames, key) >= 0 || element.el.name === key || element.el.getAttribute('data-bind') === key;
};

Transparency.clone = function(node) {
  return $(node).clone()[0];
};

Transparency.jQueryPlugin = helpers.chainable(function(models, directives, options) {
  var context, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    context = this[_i];
    _results.push(Transparency.render(context, models, directives, options));
  }
  return _results;
});

if ((typeof jQuery !== "undefined" && jQuery !== null) || (typeof Zepto !== "undefined" && Zepto !== null)) {
  $ = jQuery || Zepto;
  if ($ != null) {
    $.fn.render = Transparency.jQueryPlugin;
  }
}

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Transparency;
}

if (typeof window !== "undefined" && window !== null) {
  window.Transparency = Transparency;
}

if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
  define(function() {
    return Transparency;
  });
}

},{"../lib/lodash.js":7,"./context":3,"./helpers":5}],2:[function(require,module,exports){
var Attribute, AttributeFactory, BooleanAttribute, Class, Html, Text, helpers, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('../lib/lodash');

helpers = require('./helpers');

module.exports = AttributeFactory = {
  Attributes: {},
  createAttribute: function(element, name) {
    var Attr;
    Attr = AttributeFactory.Attributes[name] || Attribute;
    return new Attr(element, name);
  }
};

Attribute = (function() {
  function Attribute(el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || '';
  }

  Attribute.prototype.set = function(value) {
    this.el[this.name] = value;
    return this.el.setAttribute(this.name, value.toString());
  };

  return Attribute;

})();

BooleanAttribute = (function(_super) {
  var BOOLEAN_ATTRIBUTES, name, _i, _len;

  __extends(BooleanAttribute, _super);

  BOOLEAN_ATTRIBUTES = ['hidden', 'async', 'defer', 'autofocus', 'formnovalidate', 'disabled', 'autofocus', 'formnovalidate', 'multiple', 'readonly', 'required', 'checked', 'scoped', 'reversed', 'selected', 'loop', 'muted', 'autoplay', 'controls', 'seamless', 'default', 'ismap', 'novalidate', 'open', 'typemustmatch', 'truespeed'];

  for (_i = 0, _len = BOOLEAN_ATTRIBUTES.length; _i < _len; _i++) {
    name = BOOLEAN_ATTRIBUTES[_i];
    AttributeFactory.Attributes[name] = BooleanAttribute;
  }

  function BooleanAttribute(el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || false;
  }

  BooleanAttribute.prototype.set = function(value) {
    this.el[this.name] = value;
    if (value) {
      return this.el.setAttribute(this.name, this.name);
    } else {
      return this.el.removeAttribute(this.name);
    }
  };

  return BooleanAttribute;

})(Attribute);

Text = (function(_super) {
  __extends(Text, _super);

  AttributeFactory.Attributes['text'] = Text;

  function Text(el, name) {
    var child;
    this.el = el;
    this.name = name;
    this.templateValue = ((function() {
      var _i, _len, _ref, _results;
      _ref = this.el.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType === helpers.TEXT_NODE) {
          _results.push(child.nodeValue);
        }
      }
      return _results;
    }).call(this)).join('');
    this.children = _.toArray(this.el.children);
    if (!(this.textNode = this.el.firstChild)) {
      this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(''));
    } else if (this.textNode.nodeType !== helpers.TEXT_NODE) {
      this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(''), this.textNode);
    }
  }

  Text.prototype.set = function(text) {
    var child, _i, _len, _ref, _results;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.textNode.nodeValue = text;
    this.el.appendChild(this.textNode);
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  };

  return Text;

})(Attribute);

Html = (function(_super) {
  __extends(Html, _super);

  AttributeFactory.Attributes['html'] = Html;

  function Html(el) {
    this.el = el;
    this.templateValue = '';
    this.children = _.toArray(this.el.children);
  }

  Html.prototype.set = function(html) {
    var child, _i, _len, _ref, _results;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.el.innerHTML = html + this.templateValue;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  };

  return Html;

})(Attribute);

Class = (function(_super) {
  __extends(Class, _super);

  AttributeFactory.Attributes['class'] = Class;

  function Class(el) {
    Class.__super__.constructor.call(this, el, 'class');
  }

  return Class;

})(Attribute);

},{"../lib/lodash":7,"./helpers":5}],3:[function(require,module,exports){
var Context, Instance, after, before, chainable, cloneNode, _ref;

_ref = require('./helpers'), before = _ref.before, after = _ref.after, chainable = _ref.chainable, cloneNode = _ref.cloneNode;

Instance = require('./instance');

module.exports = Context = (function() {
  var attach, detach;

  detach = chainable(function() {
    this.parent = this.el.parentNode;
    if (this.parent) {
      this.nextSibling = this.el.nextSibling;
      return this.parent.removeChild(this.el);
    }
  });

  attach = chainable(function() {
    if (this.parent) {
      if (this.nextSibling) {
        return this.parent.insertBefore(this.el, this.nextSibling);
      } else {
        return this.parent.appendChild(this.el);
      }
    }
  });

  function Context(el, Transparency) {
    this.el = el;
    this.Transparency = Transparency;
    this.template = cloneNode(this.el);
    this.instances = [new Instance(this.el, this.Transparency)];
    this.instanceCache = [];
  }

  Context.prototype.render = before(detach)(after(attach)(chainable(function(models, directives, options) {
    var children, index, instance, model, _i, _len, _results;
    while (models.length < this.instances.length) {
      this.instanceCache.push(this.instances.pop().remove());
    }
    while (models.length > this.instances.length) {
      instance = this.instanceCache.pop() || new Instance(cloneNode(this.template), this.Transparency);
      this.instances.push(instance.appendTo(this.el));
    }
    _results = [];
    for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
      model = models[index];
      instance = this.instances[index];
      children = [];
      _results.push(instance.prepare(model, children).renderValues(model, children).renderDirectives(model, index, directives).renderChildren(model, children, directives, options));
    }
    return _results;
  })));

  return Context;

})();

},{"./helpers":5,"./instance":6}],4:[function(require,module,exports){
var AttributeFactory, Checkbox, Element, ElementFactory, Input, Radio, Select, TextArea, VoidElement, helpers, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('../lib/lodash.js');

helpers = require('./helpers');

AttributeFactory = require('./attributeFactory');

module.exports = ElementFactory = {
  Elements: {
    input: {}
  },
  createElement: function(el) {
    var El, name;
    if ('input' === (name = el.nodeName.toLowerCase())) {
      El = ElementFactory.Elements[name][el.type.toLowerCase()] || Input;
    } else {
      El = ElementFactory.Elements[name] || Element;
    }
    return new El(el);
  }
};

Element = (function() {
  function Element(el) {
    this.el = el;
    this.attributes = {};
    this.childNodes = _.toArray(this.el.childNodes);
    this.nodeName = this.el.nodeName.toLowerCase();
    this.classNames = this.el.className.split(' ');
    this.originalAttributes = {};
  }

  Element.prototype.empty = function() {
    var child;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    return this;
  };

  Element.prototype.reset = function() {
    var attribute, name, _ref, _results;
    _ref = this.attributes;
    _results = [];
    for (name in _ref) {
      attribute = _ref[name];
      _results.push(attribute.set(attribute.templateValue));
    }
    return _results;
  };

  Element.prototype.render = function(value) {
    return this.attr('text', value);
  };

  Element.prototype.attr = function(name, value) {
    var attribute, _base;
    attribute = (_base = this.attributes)[name] || (_base[name] = AttributeFactory.createAttribute(this.el, name, value));
    if (value != null) {
      attribute.set(value);
    }
    return attribute;
  };

  Element.prototype.renderDirectives = function(model, index, attributes) {
    var directive, name, value, _results;
    _results = [];
    for (name in attributes) {
      if (!__hasProp.call(attributes, name)) continue;
      directive = attributes[name];
      if (!(typeof directive === 'function')) {
        continue;
      }
      value = directive.call(model, {
        element: this.el,
        index: index,
        value: this.attr(name).templateValue
      });
      if (value != null) {
        _results.push(this.attr(name, value));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Element;

})();

Select = (function(_super) {
  __extends(Select, _super);

  ElementFactory.Elements['select'] = Select;

  function Select(el) {
    Select.__super__.constructor.call(this, el);
    this.elements = helpers.getElements(el);
  }

  Select.prototype.render = function(value) {
    var option, _i, _len, _ref, _results;
    value = value.toString();
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      option = _ref[_i];
      if (option.nodeName === 'option') {
        _results.push(option.attr('selected', option.el.value === value));
      }
    }
    return _results;
  };

  return Select;

})(Element);

VoidElement = (function(_super) {
  var VOID_ELEMENTS, nodeName, _i, _len;

  __extends(VoidElement, _super);

  function VoidElement() {
    return VoidElement.__super__.constructor.apply(this, arguments);
  }

  VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  for (_i = 0, _len = VOID_ELEMENTS.length; _i < _len; _i++) {
    nodeName = VOID_ELEMENTS[_i];
    ElementFactory.Elements[nodeName] = VoidElement;
  }

  VoidElement.prototype.attr = function(name, value) {
    if (name !== 'text' && name !== 'html') {
      return VoidElement.__super__.attr.call(this, name, value);
    }
  };

  return VoidElement;

})(Element);

Input = (function(_super) {
  __extends(Input, _super);

  function Input() {
    return Input.__super__.constructor.apply(this, arguments);
  }

  Input.prototype.render = function(value) {
    return this.attr('value', value);
  };

  return Input;

})(VoidElement);

TextArea = (function(_super) {
  __extends(TextArea, _super);

  function TextArea() {
    return TextArea.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['textarea'] = TextArea;

  return TextArea;

})(Input);

Checkbox = (function(_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    return Checkbox.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['input']['checkbox'] = Checkbox;

  Checkbox.prototype.render = function(value) {
    return this.attr('checked', Boolean(value));
  };

  return Checkbox;

})(Input);

Radio = (function(_super) {
  __extends(Radio, _super);

  function Radio() {
    return Radio.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['input']['radio'] = Radio;

  return Radio;

})(Checkbox);

},{"../lib/lodash.js":7,"./attributeFactory":2,"./helpers":5}],5:[function(require,module,exports){
var ElementFactory, expando, html5Clone, _getElements;

ElementFactory = require('./elementFactory');

exports.before = function(decorator) {
  return function(method) {
    return function() {
      decorator.apply(this, arguments);
      return method.apply(this, arguments);
    };
  };
};

exports.after = function(decorator) {
  return function(method) {
    return function() {
      method.apply(this, arguments);
      return decorator.apply(this, arguments);
    };
  };
};

exports.chainable = exports.after(function() {
  return this;
});

exports.onlyWith$ = function(fn) {
  if ((typeof jQuery !== "undefined" && jQuery !== null) || (typeof Zepto !== "undefined" && Zepto !== null)) {
    return (function($) {
      return fn(arguments);
    })(jQuery || Zepto);
  }
};

exports.getElements = function(el) {
  var elements;
  elements = [];
  _getElements(el, elements);
  return elements;
};

_getElements = function(template, elements) {
  var child, _results;
  child = template.firstChild;
  _results = [];
  while (child) {
    if (child.nodeType === exports.ELEMENT_NODE) {
      elements.push(new ElementFactory.createElement(child));
      _getElements(child, elements);
    }
    _results.push(child = child.nextSibling);
  }
  return _results;
};

exports.ELEMENT_NODE = 1;

exports.TEXT_NODE = 3;

html5Clone = function() {
  return document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
};

exports.cloneNode = (typeof document === "undefined" || document === null) || html5Clone() ? function(node) {
  return node.cloneNode(true);
} : function(node) {
  var cloned, element, _i, _len, _ref;
  cloned = Transparency.clone(node);
  if (cloned.nodeType === exports.ELEMENT_NODE) {
    cloned.removeAttribute(expando);
    _ref = cloned.getElementsByTagName('*');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.removeAttribute(expando);
    }
  }
  return cloned;
};

expando = 'transparency';

exports.data = function(element) {
  return element[expando] || (element[expando] = {});
};

exports.nullLogger = function() {};

exports.consoleLogger = function() {
  return console.log(arguments);
};

exports.log = exports.nullLogger;

},{"./elementFactory":4}],6:[function(require,module,exports){
var Instance, chainable, helpers, _,
  __hasProp = {}.hasOwnProperty;

_ = require('../lib/lodash.js');

chainable = (helpers = require('./helpers')).chainable;

module.exports = Instance = (function() {
  function Instance(template, Transparency) {
    this.Transparency = Transparency;
    this.queryCache = {};
    this.childNodes = _.toArray(template.childNodes);
    this.elements = helpers.getElements(template);
  }

  Instance.prototype.remove = chainable(function() {
    var node, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(node.parentNode.removeChild(node));
    }
    return _results;
  });

  Instance.prototype.appendTo = chainable(function(parent) {
    var node, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(parent.appendChild(node));
    }
    return _results;
  });

  Instance.prototype.prepare = chainable(function(model) {
    var element, _i, _len, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.reset();
      _results.push(helpers.data(element.el).model = model);
    }
    return _results;
  });

  Instance.prototype.renderValues = chainable(function(model, children) {
    var element, key, value, _results;
    if (_.isElement(model) && (element = this.elements[0])) {
      return element.empty().el.appendChild(model);
    } else if (typeof model === 'object') {
      _results = [];
      for (key in model) {
        if (!__hasProp.call(model, key)) continue;
        value = model[key];
        if (value != null) {
          if (_.isString(value) || _.isNumber(value) || _.isBoolean(value) || _.isDate(value)) {
            _results.push((function() {
              var _i, _len, _ref, _results1;
              _ref = this.matchingElements(key);
              _results1 = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                element = _ref[_i];
                _results1.push(element.render(value));
              }
              return _results1;
            }).call(this));
          } else if (typeof value === 'object') {
            _results.push(children.push(key));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    }
  });

  Instance.prototype.renderDirectives = chainable(function(model, index, directives) {
    var attributes, element, key, _results;
    _results = [];
    for (key in directives) {
      if (!__hasProp.call(directives, key)) continue;
      attributes = directives[key];
      if (!(typeof attributes === 'object')) {
        continue;
      }
      if (typeof model !== 'object') {
        model = {
          value: model
        };
      }
      _results.push((function() {
        var _i, _len, _ref, _results1;
        _ref = this.matchingElements(key);
        _results1 = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          _results1.push(element.renderDirectives(model, index, attributes));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  });

  Instance.prototype.renderChildren = chainable(function(model, children, directives, options) {
    var element, key, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      key = children[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = this.matchingElements(key);
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          element = _ref[_j];
          _results1.push(this.Transparency.render(element.el, model[key], directives[key], options));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  });

  Instance.prototype.matchingElements = function(key) {
    var el, elements, _base;
    elements = (_base = this.queryCache)[key] || (_base[key] = (function() {
      var _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (this.Transparency.matcher(el, key)) {
          _results.push(el);
        }
      }
      return _results;
    }).call(this));
    helpers.log("Matching elements for '" + key + "':", elements);
    return elements;
  };

  return Instance;

})();

},{"../lib/lodash.js":7,"./helpers":5}],7:[function(require,module,exports){
 var _ = {};

_.toString = Object.prototype.toString;

_.toArray = function(obj) {
  var arr = new Array(obj.length);
  for (var i = 0; i < obj.length; i++) {
    arr[i] = obj[i];
  }
  return arr;
};

_.isString = function(obj) { return _.toString.call(obj) == '[object String]'; };

_.isNumber = function(obj) { return _.toString.call(obj) == '[object Number]'; };

_.isArray = Array.isArray || function(obj) {
  return _.toString.call(obj) === '[object Array]';
};

_.isDate = function(obj) {
  return _.toString.call(obj) === '[object Date]';
};

_.isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);
};

_.isPlainValue = function(obj) {
  var type;
  type = typeof obj;
  return (type !== 'object' && type !== 'function') || exports.isDate(obj);
};

_.isBoolean = function(obj) {
  return obj === true || obj === false;
};

module.exports = _;

},{}]},{},[1]);
;
/*
Ability score data.
Score, points cost & modifier.
 */
var abilities, abilityScore;

abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

abilityScore = {
  8: {
    pointsCost: 0,
    modifier: -1
  },
  9: {
    pointsCost: 1,
    modifier: -1
  },
  10: {
    pointsCost: 2,
    modifier: 0
  },
  11: {
    pointsCost: 3,
    modifier: 0
  },
  12: {
    pointsCost: 4,
    modifier: +1
  },
  13: {
    pointsCost: 5,
    modifier: +1
  },
  14: {
    pointsCost: 7,
    modifier: +2
  },
  15: {
    pointsCost: 9,
    modifier: +2
  }
};
;
/*
Racial ability score bonuses
 */
var raceBonuses;

raceBonuses = {
  "Human": {
    "bonus-str": 1,
    "bonus-dex": 1,
    "bonus-con": 1,
    "bonus-int": 1,
    "bonus-wis": 1,
    "bonus-cha": 1
  },
  "Dwarf": {
    "bonus-str": 0,
    "bonus-dex": 0,
    "bonus-con": 2,
    "bonus-int": 0,
    "bonus-wis": 0,
    "bonus-cha": 0
  },
  "Elf": {
    "bonus-str": 0,
    "bonus-dex": 2,
    "bonus-con": 0,
    "bonus-int": 0,
    "bonus-wis": 0,
    "bonus-cha": 0
  },
  "Half-Elf": {
    "bonus-str": 0,
    "bonus-dex": 0,
    "bonus-con": 0,
    "bonus-int": 0,
    "bonus-wis": 0,
    "bonus-cha": 2,
    other: 2
  },
  "Halfling": {
    "bonus-str": 0,
    "bonus-dex": 2,
    "bonus-con": 0,
    "bonus-int": 0,
    "bonus-wis": 0,
    "bonus-cha": 0
  },
  "Half-Orc": {
    "bonus-str": 2,
    "bonus-dex": 0,
    "bonus-con": 1,
    "bonus-int": 0,
    "bonus-wis": 0,
    "bonus-cha": 0
  },
  "Gnome": {
    "bonus-str": 0,
    "bonus-dex": 0,
    "bonus-con": 0,
    "bonus-int": 2,
    "bonus-wis": 0,
    "bonus-cha": 0
  },
  "Dragonborn": {
    "bonus-str": 2,
    "bonus-dex": 0,
    "bonus-con": 0,
    "bonus-int": 0,
    "bonus-wis": 0,
    "bonus-cha": 1
  },
  "Tiefling": {
    "bonus-str": 0,
    "bonus-dex": 0,
    "bonus-con": 0,
    "bonus-int": 1,
    "bonus-wis": 0,
    "bonus-cha": 2
  }
};
;var ability, abilitySelects, abilityTable, calcAbilityPointsRemaining, calcModifier, i, len, raceSelect, updateAbilityScoreTable;

abilitySelects = document.querySelectorAll('.ability-select');

raceSelect = document.getElementById('race-select');

abilityTable = document.getElementById('ability-score-table');


/*
Calc modifier from ability score
 */

calcModifier = function(score) {
  if (score === 10) {
    return 0;
  } else if (score <= 9) {
    return -1;
  } else if (score > 10) {
    return Math.floor((score - 9) / 2);
  }
};


/*
Update ability table with chosen scores
@uses calcModifier()
 */

updateAbilityScoreTable = function() {
  var ability, cha, chosenRace, con, data, dex, i, int, j, k, len, len1, len2, raceData, str, value, wis;
  chosenRace = raceSelect.value;
  raceData = raceBonuses[chosenRace];
  str = Number(document.getElementById('str').value);
  dex = Number(document.getElementById('dex').value);
  con = Number(document.getElementById('con').value);
  int = Number(document.getElementById('int').value);
  wis = Number(document.getElementById('wis').value);
  cha = Number(document.getElementById('cha').value);
  data = {
    str: str,
    dex: dex,
    con: con,
    int: int,
    wis: wis,
    cha: cha
  };
  for (i = 0, len = abilities.length; i < len; i++) {
    ability = abilities[i];
    data[ability + '-points'] = abilityScore[data[ability]].pointsCost;
  }
  for (ability in raceData) {
    value = raceData[ability];
    data[ability] = Number(value > 0) ? Number(value) : null;
  }
  for (j = 0, len1 = abilities.length; j < len1; j++) {
    ability = abilities[j];
    data['adjusted-' + ability] = data['bonus-' + ability] > 0 ? data[ability] + data['bonus-' + ability] : null;
  }
  for (k = 0, len2 = abilities.length; k < len2; k++) {
    ability = abilities[k];
    if (data['adjusted-' + ability] !== null) {
      data[ability + '-modifier'] = calcModifier(data['adjusted-' + ability]);
    } else {
      data[ability + '-modifier'] = calcModifier(data[ability]);
    }
  }
  console.log(data);
  return Transparency.render(abilityTable, data);
};


/*
Calc ability points remaining and update counter HTML.
Add and error class to counter if overspent points.
@uses updateAbilityScoreTable()
 */

calcAbilityPointsRemaining = function() {
  var ability, counter, i, len, maxPoints, pointsRemaining, totalScore;
  totalScore = 0;
  maxPoints = 27;
  counter = document.getElementById('points-remaining');
  for (i = 0, len = abilitySelects.length; i < len; i++) {
    ability = abilitySelects[i];
    totalScore = totalScore + Number(abilityScore[ability.value].pointsCost);
  }
  pointsRemaining = Number(maxPoints - totalScore);
  if (pointsRemaining < 0) {
    if (!counter.className.match(/(?:^|\s)has-error(?!\S)/)) {
      counter.className += " has-error";
    }
  } else {
    counter.className = counter.className.replace(/(?:^|\s)has-error(?!\S)/g, '');
  }
  counter.innerHTML = pointsRemaining;
  return updateAbilityScoreTable();
};

for (i = 0, len = abilitySelects.length; i < len; i++) {
  ability = abilitySelects[i];
  ability.addEventListener('change', calcAbilityPointsRemaining);
}

raceSelect.addEventListener('change', updateAbilityScoreTable);

//# sourceMappingURL=build.js.map
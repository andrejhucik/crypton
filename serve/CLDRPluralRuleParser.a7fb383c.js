// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"libs/CLDRPluralRuleParser/src/CLDRPluralRuleParser.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * cldrpluralparser.js
 * A parser engine for CLDR plural rules.
 *
 * Copyright 2012-2014 Santhosh Thottingal and other contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * @source https://github.com/santhoshtr/CLDRPluralRuleParser
 * @author Santhosh Thottingal <santhosh.thottingal@gmail.com>
 * @author Timo Tijhof
 * @author Amir Aharoni
 */

/**
 * Evaluates a plural rule in CLDR syntax for a number
 * @param {string} rule
 * @param {integer} number
 * @return {boolean} true if evaluation passed, false if evaluation failed.
 */
// UMD returnExports https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.pluralRuleParser = factory();
  }
})(this, function () {
  function pluralRuleParser(rule, number) {
    'use strict';
    /*
    Syntax: see http://unicode.org/reports/tr35/#Language_Plural_Rules
    -----------------------------------------------------------------
    condition     = and_condition ('or' and_condition)*
    	('@integer' samples)?
    	('@decimal' samples)?
    and_condition = relation ('and' relation)*
    relation      = is_relation | in_relation | within_relation
    is_relation   = expr 'is' ('not')? value
    in_relation   = expr (('not')? 'in' | '=' | '!=') range_list
    within_relation = expr ('not')? 'within' range_list
    expr          = operand (('mod' | '%') value)?
    operand       = 'n' | 'i' | 'f' | 't' | 'v' | 'w'
    range_list    = (range | value) (',' range_list)*
    value         = digit+
    digit         = 0|1|2|3|4|5|6|7|8|9
    range         = value'..'value
    samples       = sampleRange (',' sampleRange)* (',' ('…'|'...'))?
    sampleRange   = decimalValue '~' decimalValue
    decimalValue  = value ('.' value)?
    */
    // We don't evaluate the samples section of the rule. Ignore it.

    rule = rule.split('@')[0].replace(/^\s*/, '').replace(/\s*$/, '');

    if (!rule.length) {
      // Empty rule or 'other' rule.
      return true;
    } // Indicates the current position in the rule as we parse through it.
    // Shared among all parsing functions below.


    var pos = 0,
        operand,
        expression,
        relation,
        result,
        whitespace = makeRegexParser(/^\s+/),
        value = makeRegexParser(/^\d+/),
        _n_ = makeStringParser('n'),
        _i_ = makeStringParser('i'),
        _f_ = makeStringParser('f'),
        _t_ = makeStringParser('t'),
        _v_ = makeStringParser('v'),
        _w_ = makeStringParser('w'),
        _is_ = makeStringParser('is'),
        _isnot_ = makeStringParser('is not'),
        _isnot_sign_ = makeStringParser('!='),
        _equal_ = makeStringParser('='),
        _mod_ = makeStringParser('mod'),
        _percent_ = makeStringParser('%'),
        _not_ = makeStringParser('not'),
        _in_ = makeStringParser('in'),
        _within_ = makeStringParser('within'),
        _range_ = makeStringParser('..'),
        _comma_ = makeStringParser(','),
        _or_ = makeStringParser('or'),
        _and_ = makeStringParser('and');

    function debug() {// console.log.apply(console, arguments);
    }

    debug('pluralRuleParser', rule, number); // Try parsers until one works, if none work return null

    function choice(parserSyntax) {
      return function () {
        var i, result;

        for (i = 0; i < parserSyntax.length; i++) {
          result = parserSyntax[i]();

          if (result !== null) {
            return result;
          }
        }

        return null;
      };
    } // Try several parserSyntax-es in a row.
    // All must succeed; otherwise, return null.
    // This is the only eager one.


    function sequence(parserSyntax) {
      var i,
          parserRes,
          originalPos = pos,
          result = [];

      for (i = 0; i < parserSyntax.length; i++) {
        parserRes = parserSyntax[i]();

        if (parserRes === null) {
          pos = originalPos;
          return null;
        }

        result.push(parserRes);
      }

      return result;
    } // Run the same parser over and over until it fails.
    // Must succeed a minimum of n times; otherwise, return null.


    function nOrMore(n, p) {
      return function () {
        var originalPos = pos,
            result = [],
            parsed = p();

        while (parsed !== null) {
          result.push(parsed);
          parsed = p();
        }

        if (result.length < n) {
          pos = originalPos;
          return null;
        }

        return result;
      };
    } // Helpers - just make parserSyntax out of simpler JS builtin types


    function makeStringParser(s) {
      var len = s.length;
      return function () {
        var result = null;

        if (rule.substr(pos, len) === s) {
          result = s;
          pos += len;
        }

        return result;
      };
    }

    function makeRegexParser(regex) {
      return function () {
        var matches = rule.substr(pos).match(regex);

        if (matches === null) {
          return null;
        }

        pos += matches[0].length;
        return matches[0];
      };
    }
    /**
     * Integer digits of n.
     */


    function i() {
      var result = _i_();

      if (result === null) {
        debug(' -- failed i', parseInt(number, 10));
        return result;
      }

      result = parseInt(number, 10);
      debug(' -- passed i ', result);
      return result;
    }
    /**
     * Absolute value of the source number (integer and decimals).
     */


    function n() {
      var result = _n_();

      if (result === null) {
        debug(' -- failed n ', number);
        return result;
      }

      result = parseFloat(number, 10);
      debug(' -- passed n ', result);
      return result;
    }
    /**
     * Visible fractional digits in n, with trailing zeros.
     */


    function f() {
      var result = _f_();

      if (result === null) {
        debug(' -- failed f ', number);
        return result;
      }

      result = (number + '.').split('.')[1] || 0;
      debug(' -- passed f ', result);
      return result;
    }
    /**
     * Visible fractional digits in n, without trailing zeros.
     */


    function t() {
      var result = _t_();

      if (result === null) {
        debug(' -- failed t ', number);
        return result;
      }

      result = (number + '.').split('.')[1].replace(/0$/, '') || 0;
      debug(' -- passed t ', result);
      return result;
    }
    /**
     * Number of visible fraction digits in n, with trailing zeros.
     */


    function v() {
      var result = _v_();

      if (result === null) {
        debug(' -- failed v ', number);
        return result;
      }

      result = (number + '.').split('.')[1].length || 0;
      debug(' -- passed v ', result);
      return result;
    }
    /**
     * Number of visible fraction digits in n, without trailing zeros.
     */


    function w() {
      var result = _w_();

      if (result === null) {
        debug(' -- failed w ', number);
        return result;
      }

      result = (number + '.').split('.')[1].replace(/0$/, '').length || 0;
      debug(' -- passed w ', result);
      return result;
    } // operand       = 'n' | 'i' | 'f' | 't' | 'v' | 'w'


    operand = choice([n, i, f, t, v, w]); // expr          = operand (('mod' | '%') value)?

    expression = choice([mod, operand]);

    function mod() {
      var result = sequence([operand, whitespace, choice([_mod_, _percent_]), whitespace, value]);

      if (result === null) {
        debug(' -- failed mod');
        return null;
      }

      debug(' -- passed ' + parseInt(result[0], 10) + ' ' + result[2] + ' ' + parseInt(result[4], 10));
      return parseFloat(result[0]) % parseInt(result[4], 10);
    }

    function not() {
      var result = sequence([whitespace, _not_]);

      if (result === null) {
        debug(' -- failed not');
        return null;
      }

      return result[1];
    } // is_relation   = expr 'is' ('not')? value


    function is() {
      var result = sequence([expression, whitespace, choice([_is_]), whitespace, value]);

      if (result !== null) {
        debug(' -- passed is : ' + result[0] + ' == ' + parseInt(result[4], 10));
        return result[0] === parseInt(result[4], 10);
      }

      debug(' -- failed is');
      return null;
    } // is_relation   = expr 'is' ('not')? value


    function isnot() {
      var result = sequence([expression, whitespace, choice([_isnot_, _isnot_sign_]), whitespace, value]);

      if (result !== null) {
        debug(' -- passed isnot: ' + result[0] + ' != ' + parseInt(result[4], 10));
        return result[0] !== parseInt(result[4], 10);
      }

      debug(' -- failed isnot');
      return null;
    }

    function not_in() {
      var i,
          range_list,
          result = sequence([expression, whitespace, _isnot_sign_, whitespace, rangeList]);

      if (result !== null) {
        debug(' -- passed not_in: ' + result[0] + ' != ' + result[4]);
        range_list = result[4];

        for (i = 0; i < range_list.length; i++) {
          if (parseInt(range_list[i], 10) === parseInt(result[0], 10)) {
            return false;
          }
        }

        return true;
      }

      debug(' -- failed not_in');
      return null;
    } // range_list    = (range | value) (',' range_list)*


    function rangeList() {
      var result = sequence([choice([range, value]), nOrMore(0, rangeTail)]),
          resultList = [];

      if (result !== null) {
        resultList = resultList.concat(result[0]);

        if (result[1][0]) {
          resultList = resultList.concat(result[1][0]);
        }

        return resultList;
      }

      debug(' -- failed rangeList');
      return null;
    }

    function rangeTail() {
      // ',' range_list
      var result = sequence([_comma_, rangeList]);

      if (result !== null) {
        return result[1];
      }

      debug(' -- failed rangeTail');
      return null;
    } // range         = value'..'value


    function range() {
      var i,
          array,
          left,
          right,
          result = sequence([value, _range_, value]);

      if (result !== null) {
        debug(' -- passed range');
        array = [];
        left = parseInt(result[0], 10);
        right = parseInt(result[2], 10);

        for (i = left; i <= right; i++) {
          array.push(i);
        }

        return array;
      }

      debug(' -- failed range');
      return null;
    }

    function _in() {
      var result, range_list, i; // in_relation   = expr ('not')? 'in' range_list

      result = sequence([expression, nOrMore(0, not), whitespace, choice([_in_, _equal_]), whitespace, rangeList]);

      if (result !== null) {
        debug(' -- passed _in:' + result);
        range_list = result[5];

        for (i = 0; i < range_list.length; i++) {
          if (parseInt(range_list[i], 10) === parseFloat(result[0])) {
            return result[1][0] !== 'not';
          }
        }

        return result[1][0] === 'not';
      }

      debug(' -- failed _in ');
      return null;
    }
    /**
     * The difference between "in" and "within" is that
     * "in" only includes integers in the specified range,
     * while "within" includes all values.
     */


    function within() {
      var range_list, result; // within_relation = expr ('not')? 'within' range_list

      result = sequence([expression, nOrMore(0, not), whitespace, _within_, whitespace, rangeList]);

      if (result !== null) {
        debug(' -- passed within');
        range_list = result[5];

        if (result[0] >= parseInt(range_list[0], 10) && result[0] < parseInt(range_list[range_list.length - 1], 10)) {
          return result[1][0] !== 'not';
        }

        return result[1][0] === 'not';
      }

      debug(' -- failed within ');
      return null;
    } // relation      = is_relation | in_relation | within_relation


    relation = choice([is, not_in, isnot, _in, within]); // and_condition = relation ('and' relation)*

    function and() {
      var i,
          result = sequence([relation, nOrMore(0, andTail)]);

      if (result) {
        if (!result[0]) {
          return false;
        }

        for (i = 0; i < result[1].length; i++) {
          if (!result[1][i]) {
            return false;
          }
        }

        return true;
      }

      debug(' -- failed and');
      return null;
    } // ('and' relation)*


    function andTail() {
      var result = sequence([whitespace, _and_, whitespace, relation]);

      if (result !== null) {
        debug(' -- passed andTail' + result);
        return result[3];
      }

      debug(' -- failed andTail');
      return null;
    } //  ('or' and_condition)*


    function orTail() {
      var result = sequence([whitespace, _or_, whitespace, and]);

      if (result !== null) {
        debug(' -- passed orTail: ' + result[3]);
        return result[3];
      }

      debug(' -- failed orTail');
      return null;
    } // condition     = and_condition ('or' and_condition)*


    function condition() {
      var i,
          result = sequence([and, nOrMore(0, orTail)]);

      if (result) {
        for (i = 0; i < result[1].length; i++) {
          if (result[1][i]) {
            return true;
          }
        }

        return result[0];
      }

      return false;
    }

    result = condition();
    /**
     * For success, the pos must have gotten to the end of the rule
     * and returned a non-null.
     * n.b. This is part of language infrastructure,
     * so we do not throw an internationalizable message.
     */

    if (result === null) {
      throw new Error('Parse error at position ' + pos.toString() + ' for rule: ' + rule);
    }

    if (pos !== rule.length) {
      debug('Warning: Rule not parsed completely. Parser stopped at ' + rule.substr(0, pos) + ' for rule: ' + rule);
    }

    return result;
  }

  return pluralRuleParser;
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52443" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","libs/CLDRPluralRuleParser/src/CLDRPluralRuleParser.js"], null)
//# sourceMappingURL=/CLDRPluralRuleParser.a7fb383c.map
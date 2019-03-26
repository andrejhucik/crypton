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
})({"src/jquery.i18n.parser.js":[function(require,module,exports) {
/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2011-2013 Santhosh Thottingal, Neil Kandalgaonkar
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
 * anything special to choose one license or the other and you don't have to
 * notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */
(function ($) {
  'use strict';

  var MessageParser = function MessageParser(options) {
    this.options = $.extend({}, $.i18n.parser.defaults, options);
    this.language = $.i18n.languages[String.locale] || $.i18n.languages['default'];
    this.emitter = $.i18n.parser.emitter;
  };

  MessageParser.prototype = {
    constructor: MessageParser,
    simpleParse: function simpleParse(message, parameters) {
      return message.replace(/\$(\d+)/g, function (str, match) {
        var index = parseInt(match, 10) - 1;
        return parameters[index] !== undefined ? parameters[index] : '$' + match;
      });
    },
    parse: function parse(message, replacements) {
      if (message.indexOf('{{') < 0) {
        return this.simpleParse(message, replacements);
      }

      this.emitter.language = $.i18n.languages[$.i18n().locale] || $.i18n.languages['default'];
      return this.emitter.emit(this.ast(message), replacements);
    },
    ast: function ast(message) {
      var pipe,
          colon,
          backslash,
          anyCharacter,
          dollar,
          digits,
          regularLiteral,
          regularLiteralWithoutBar,
          regularLiteralWithoutSpace,
          escapedOrLiteralWithoutBar,
          escapedOrRegularLiteral,
          templateContents,
          templateName,
          openTemplate,
          closeTemplate,
          expression,
          paramExpression,
          result,
          pos = 0; // Try parsers until one works, if none work return null

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
            res,
            originalPos = pos,
            result = [];

        for (i = 0; i < parserSyntax.length; i++) {
          res = parserSyntax[i]();

          if (res === null) {
            pos = originalPos;
            return null;
          }

          result.push(res);
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
      } // Helpers -- just make parserSyntax out of simpler JS builtin types


      function makeStringParser(s) {
        var len = s.length;
        return function () {
          var result = null;

          if (message.slice(pos, pos + len) === s) {
            result = s;
            pos += len;
          }

          return result;
        };
      }

      function makeRegexParser(regex) {
        return function () {
          var matches = message.slice(pos).match(regex);

          if (matches === null) {
            return null;
          }

          pos += matches[0].length;
          return matches[0];
        };
      }

      pipe = makeStringParser('|');
      colon = makeStringParser(':');
      backslash = makeStringParser('\\');
      anyCharacter = makeRegexParser(/^./);
      dollar = makeStringParser('$');
      digits = makeRegexParser(/^\d+/);
      regularLiteral = makeRegexParser(/^[^{}[\]$\\]/);
      regularLiteralWithoutBar = makeRegexParser(/^[^{}[\]$\\|]/);
      regularLiteralWithoutSpace = makeRegexParser(/^[^{}[\]$\s]/); // There is a general pattern:
      // parse a thing;
      // if it worked, apply transform,
      // otherwise return null.
      // But using this as a combinator seems to cause problems
      // when combined with nOrMore().
      // May be some scoping issue.

      function transform(p, fn) {
        return function () {
          var result = p();
          return result === null ? null : fn(result);
        };
      } // Used to define "literals" within template parameters. The pipe
      // character is the parameter delimeter, so by default
      // it is not a literal in the parameter


      function literalWithoutBar() {
        var result = nOrMore(1, escapedOrLiteralWithoutBar)();
        return result === null ? null : result.join('');
      }

      function literal() {
        var result = nOrMore(1, escapedOrRegularLiteral)();
        return result === null ? null : result.join('');
      }

      function escapedLiteral() {
        var result = sequence([backslash, anyCharacter]);
        return result === null ? null : result[1];
      }

      choice([escapedLiteral, regularLiteralWithoutSpace]);
      escapedOrLiteralWithoutBar = choice([escapedLiteral, regularLiteralWithoutBar]);
      escapedOrRegularLiteral = choice([escapedLiteral, regularLiteral]);

      function replacement() {
        var result = sequence([dollar, digits]);

        if (result === null) {
          return null;
        }

        return ['REPLACE', parseInt(result[1], 10) - 1];
      }

      templateName = transform( // see $wgLegalTitleChars
      // not allowing : due to the need to catch "PLURAL:$1"
      makeRegexParser(/^[ !"$&'()*,./0-9;=?@A-Z^_`a-z~\x80-\xFF+-]+/), function (result) {
        return result.toString();
      });

      function templateParam() {
        var expr,
            result = sequence([pipe, nOrMore(0, paramExpression)]);

        if (result === null) {
          return null;
        }

        expr = result[1]; // use a "CONCAT" operator if there are multiple nodes,
        // otherwise return the first node, raw.

        return expr.length > 1 ? ['CONCAT'].concat(expr) : expr[0];
      }

      function templateWithReplacement() {
        var result = sequence([templateName, colon, replacement]);
        return result === null ? null : [result[0], result[2]];
      }

      function templateWithOutReplacement() {
        var result = sequence([templateName, colon, paramExpression]);
        return result === null ? null : [result[0], result[2]];
      }

      templateContents = choice([function () {
        var res = sequence([// templates can have placeholders for dynamic
        // replacement eg: {{PLURAL:$1|one car|$1 cars}}
        // or no placeholders eg:
        // {{GRAMMAR:genitive|{{SITENAME}}}
        choice([templateWithReplacement, templateWithOutReplacement]), nOrMore(0, templateParam)]);
        return res === null ? null : res[0].concat(res[1]);
      }, function () {
        var res = sequence([templateName, nOrMore(0, templateParam)]);

        if (res === null) {
          return null;
        }

        return [res[0]].concat(res[1]);
      }]);
      openTemplate = makeStringParser('{{');
      closeTemplate = makeStringParser('}}');

      function template() {
        var result = sequence([openTemplate, templateContents, closeTemplate]);
        return result === null ? null : result[1];
      }

      expression = choice([template, replacement, literal]);
      paramExpression = choice([template, replacement, literalWithoutBar]);

      function start() {
        var result = nOrMore(0, expression)();

        if (result === null) {
          return null;
        }

        return ['CONCAT'].concat(result);
      }

      result = start();
      /*
       * For success, the pos must have gotten to the end of the input
       * and returned a non-null.
       * n.b. This is part of language infrastructure, so we do not throw an
       * internationalizable message.
       */

      if (result === null || pos !== message.length) {
        throw new Error('Parse error at position ' + pos.toString() + ' in input: ' + message);
      }

      return result;
    }
  };
  $.extend($.i18n.parser, new MessageParser());
})(jQuery);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54602" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/jquery.i18n.parser.js"], null)
//# sourceMappingURL=/jquery.i18n.parser.62304c8c.map
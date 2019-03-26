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
})({"src/jquery.i18n.emitter.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  var MessageParserEmitter = function MessageParserEmitter() {
    this.language = $.i18n.languages[String.locale] || $.i18n.languages['default'];
  };

  MessageParserEmitter.prototype = {
    constructor: MessageParserEmitter,

    /**
     * (We put this method definition here, and not in prototype, to make
     * sure it's not overwritten by any magic.) Walk entire node structure,
     * applying replacements and template functions when appropriate
     *
     * @param {Mixed} node abstract syntax tree (top node or subnode)
     * @param {Array} replacements for $1, $2, ... $n
     * @return {Mixed} single-string node or array of nodes suitable for
     *  jQuery appending.
     */
    emit: function emit(node, replacements) {
      var ret,
          subnodes,
          operation,
          messageParserEmitter = this;

      switch (_typeof(node)) {
        case 'string':
        case 'number':
          ret = node;
          break;

        case 'object':
          // node is an array of nodes
          subnodes = $.map(node.slice(1), function (n) {
            return messageParserEmitter.emit(n, replacements);
          });
          operation = node[0].toLowerCase();

          if (typeof messageParserEmitter[operation] === 'function') {
            ret = messageParserEmitter[operation](subnodes, replacements);
          } else {
            throw new Error('unknown operation "' + operation + '"');
          }

          break;

        case 'undefined':
          // Parsing the empty string (as an entire expression, or as a
          // paramExpression in a template) results in undefined
          // Perhaps a more clever parser can detect this, and return the
          // empty string? Or is that useful information?
          // The logical thing is probably to return the empty string here
          // when we encounter undefined.
          ret = '';
          break;

        default:
          throw new Error('unexpected type in AST: ' + _typeof(node));
      }

      return ret;
    },

    /**
     * Parsing has been applied depth-first we can assume that all nodes
     * here are single nodes Must return a single node to parents -- a
     * jQuery with synthetic span However, unwrap any other synthetic spans
     * in our children and pass them upwards
     *
     * @param {Array} nodes Mixed, some single nodes, some arrays of nodes.
     * @return {string}
     */
    concat: function concat(nodes) {
      var result = '';
      $.each(nodes, function (i, node) {
        // strings, integers, anything else
        result += node;
      });
      return result;
    },

    /**
     * Return escaped replacement of correct index, or string if
     * unavailable. Note that we expect the parsed parameter to be
     * zero-based. i.e. $1 should have become [ 0 ]. if the specified
     * parameter is not found return the same string (e.g. "$99" ->
     * parameter 98 -> not found -> return "$99" ) TODO throw error if
     * nodes.length > 1 ?
     *
     * @param {Array} nodes One element, integer, n >= 0
     * @param {Array} replacements for $1, $2, ... $n
     * @return {string} replacement
     */
    replace: function replace(nodes, replacements) {
      var index = parseInt(nodes[0], 10);

      if (index < replacements.length) {
        // replacement is not a string, don't touch!
        return replacements[index];
      } else {
        // index not found, fallback to displaying variable
        return '$' + (index + 1);
      }
    },

    /**
     * Transform parsed structure into pluralization n.b. The first node may
     * be a non-integer (for instance, a string representing an Arabic
     * number). So convert it back with the current language's
     * convertNumber.
     *
     * @param {Array} nodes List [ {String|Number}, {String}, {String} ... ]
     * @return {string} selected pluralized form according to current
     *  language.
     */
    plural: function plural(nodes) {
      var count = parseFloat(this.language.convertNumber(nodes[0], 10)),
          forms = nodes.slice(1);
      return forms.length ? this.language.convertPlural(count, forms) : '';
    },

    /**
     * Transform parsed structure into gender Usage
     * {{gender:gender|masculine|feminine|neutral}}.
     *
     * @param {Array} nodes List [ {String}, {String}, {String} , {String} ]
     * @return {string} selected gender form according to current language
     */
    gender: function gender(nodes) {
      var gender = nodes[0],
          forms = nodes.slice(1);
      return this.language.gender(gender, forms);
    },

    /**
     * Transform parsed structure into grammar conversion. Invoked by
     * putting {{grammar:form|word}} in a message
     *
     * @param {Array} nodes List [{Grammar case eg: genitive}, {String word}]
     * @return {string} selected grammatical form according to current
     *  language.
     */
    grammar: function grammar(nodes) {
      var form = nodes[0],
          word = nodes[1];
      return word && form && this.language.convertGrammar(word, form);
    }
  };
  $.extend($.i18n.parser.emitter, new MessageParserEmitter());
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/jquery.i18n.emitter.js"], null)
//# sourceMappingURL=/jquery.i18n.emitter.b4ab222f.map
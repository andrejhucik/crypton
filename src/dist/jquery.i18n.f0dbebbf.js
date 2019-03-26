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
})({"src/jquery.i18n.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
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

  var _I18N,
      slice = Array.prototype.slice;
  /**
   * @constructor
   * @param {Object} options
   */


  _I18N = function I18N(options) {
    // Load defaults
    this.options = $.extend({}, _I18N.defaults, options);
    this.parser = this.options.parser;
    this.locale = this.options.locale;
    this.messageStore = this.options.messageStore;
    this.languages = {};
  };

  _I18N.prototype = {
    /**
     * Localize a given messageKey to a locale.
     * @param {string} messageKey
     * @return {string} Localized message
     */
    localize: function localize(messageKey) {
      var localeParts, localePartIndex, locale, fallbackIndex, tryingLocale, message;
      locale = this.locale;
      fallbackIndex = 0;

      while (locale) {
        // Iterate through locales starting at most-specific until
        // localization is found. As in fi-Latn-FI, fi-Latn and fi.
        localeParts = locale.split('-');
        localePartIndex = localeParts.length;

        do {
          tryingLocale = localeParts.slice(0, localePartIndex).join('-');
          message = this.messageStore.get(tryingLocale, messageKey);

          if (message) {
            return message;
          }

          localePartIndex--;
        } while (localePartIndex);

        if (locale === this.options.fallbackLocale) {
          break;
        }

        locale = $.i18n.fallbacks[this.locale] && $.i18n.fallbacks[this.locale][fallbackIndex] || this.options.fallbackLocale;
        $.i18n.log('Trying fallback locale for ' + this.locale + ': ' + locale + ' (' + messageKey + ')');
        fallbackIndex++;
      } // key not found


      return '';
    },

    /*
     * Destroy the i18n instance.
     */
    destroy: function destroy() {
      $.removeData(document, 'i18n');
    },

    /**
     * General message loading API This can take a URL string for
     * the json formatted messages. Example:
     * <code>load('path/to/all_localizations.json');</code>
     *
     * To load a localization file for a locale:
     * <code>
     * load('path/to/de-messages.json', 'de' );
     * </code>
     *
     * To load a localization file from a directory:
     * <code>
     * load('path/to/i18n/directory', 'de' );
     * </code>
     * The above method has the advantage of fallback resolution.
     * ie, it will automatically load the fallback locales for de.
     * For most usecases, this is the recommended method.
     * It is optional to have trailing slash at end.
     *
     * A data object containing message key- message translation mappings
     * can also be passed. Example:
     * <code>
     * load( { 'hello' : 'Hello' }, optionalLocale );
     * </code>
     *
     * A source map containing key-value pair of languagename and locations
     * can also be passed. Example:
     * <code>
     * load( {
     * bn: 'i18n/bn.json',
     * he: 'i18n/he.json',
     * en: 'i18n/en.json'
     * } )
     * </code>
     *
     * If the data argument is null/undefined/false,
     * all cached messages for the i18n instance will get reset.
     *
     * @param {string|Object} source
     * @param {string} locale Language tag
     * @return {jQuery.Promise}
     */
    load: function load(source, locale) {
      var fallbackLocales,
          locIndex,
          fallbackLocale,
          sourceMap = {};

      if (!source && !locale) {
        source = 'i18n/' + $.i18n().locale + '.json';
        locale = $.i18n().locale;
      }

      if (typeof source === 'string' && // source extension should be json, but can have query params after that.
      source.split('?')[0].split('.').pop() !== 'json') {
        // Load specified locale then check for fallbacks when directory is
        // specified in load()
        sourceMap[locale] = source + '/' + locale + '.json';
        fallbackLocales = ($.i18n.fallbacks[locale] || []).concat(this.options.fallbackLocale);

        for (locIndex = 0; locIndex < fallbackLocales.length; locIndex++) {
          fallbackLocale = fallbackLocales[locIndex];
          sourceMap[fallbackLocale] = source + '/' + fallbackLocale + '.json';
        }

        return this.load(sourceMap);
      } else {
        return this.messageStore.load(source, locale);
      }
    },

    /**
     * Does parameter and magic word substitution.
     *
     * @param {string} key Message key
     * @param {Array} parameters Message parameters
     * @return {string}
     */
    parse: function parse(key, parameters) {
      var message = this.localize(key); // FIXME: This changes the state of the I18N object,
      // should probably not change the 'this.parser' but just
      // pass it to the parser.

      this.parser.language = $.i18n.languages[$.i18n().locale] || $.i18n.languages['default'];

      if (message === '') {
        message = key;
      }

      return this.parser.parse(message, parameters);
    }
  };
  /**
   * Process a message from the $.I18N instance
   * for the current document, stored in jQuery.data(document).
   *
   * @param {string} key Key of the message.
   * @param {string} param1 [param...] Variadic list of parameters for {key}.
   * @return {string|$.I18N} Parsed message, or if no key was given
   * the instance of $.I18N is returned.
   */

  $.i18n = function (key, param1) {
    var parameters,
        i18n = $.data(document, 'i18n'),
        options = _typeof(key) === 'object' && key; // If the locale option for this call is different then the setup so far,
    // update it automatically. This doesn't just change the context for this
    // call but for all future call as well.
    // If there is no i18n setup yet, don't do this. It will be taken care of
    // by the `new I18N` construction below.
    // NOTE: It should only change language for this one call.
    // Then cache instances of I18N somewhere.

    if (options && options.locale && i18n && i18n.locale !== options.locale) {
      i18n.locale = options.locale;
    }

    if (!i18n) {
      i18n = new _I18N(options);
      $.data(document, 'i18n', i18n);
    }

    if (typeof key === 'string') {
      if (param1 !== undefined) {
        parameters = slice.call(arguments, 1);
      } else {
        parameters = [];
      }

      return i18n.parse(key, parameters);
    } else {
      // FIXME: remove this feature/bug.
      return i18n;
    }
  };

  $.fn.i18n = function () {
    var i18n = $.data(document, 'i18n');

    if (!i18n) {
      i18n = new _I18N();
      $.data(document, 'i18n', i18n);
    }

    return this.each(function () {
      var $this = $(this),
          messageKey = $this.data('i18n'),
          lBracket,
          rBracket,
          type,
          key;

      if (messageKey) {
        lBracket = messageKey.indexOf('[');
        rBracket = messageKey.indexOf(']');

        if (lBracket !== -1 && rBracket !== -1 && lBracket < rBracket) {
          type = messageKey.slice(lBracket + 1, rBracket);
          key = messageKey.slice(rBracket + 1);

          if (type === 'html') {
            $this.html(i18n.parse(key));
          } else {
            $this.attr(type, i18n.parse(key));
          }
        } else {
          $this.text(i18n.parse(messageKey));
        }
      } else {
        $this.find('[data-i18n]').i18n();
      }
    });
  };

  function getDefaultLocale() {
    var locale = $('html').attr('lang');

    if (!locale) {
      locale = navigator.language || navigator.userLanguage || '';
    }

    return locale;
  }

  $.i18n.languages = {};
  $.i18n.messageStore = $.i18n.messageStore || {};
  $.i18n.parser = {
    // The default parser only handles variable substitution
    parse: function parse(message, parameters) {
      return message.replace(/\$(\d+)/g, function (str, match) {
        var index = parseInt(match, 10) - 1;
        return parameters[index] !== undefined ? parameters[index] : '$' + match;
      });
    },
    emitter: {}
  };
  $.i18n.fallbacks = {};
  $.i18n.debug = false;

  $.i18n.log = function ()
  /* arguments */
  {
    if (window.console && $.i18n.debug) {
      window.console.log.apply(window.console, arguments);
    }
  };
  /* Static members */


  _I18N.defaults = {
    locale: getDefaultLocale(),
    fallbackLocale: 'en',
    parser: $.i18n.parser,
    messageStore: $.i18n.messageStore
  }; // Expose constructor

  $.i18n.constructor = _I18N;
})(jQuery);
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57798" + '/');

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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/jquery.i18n.js"], null)
//# sourceMappingURL=/jquery.i18n.f0dbebbf.map
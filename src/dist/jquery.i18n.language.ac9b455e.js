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
})({"src/jquery.i18n.language.js":[function(require,module,exports) {
/* global pluralRuleParser */
(function ($) {
  'use strict'; // jscs:disable

  var language = {
    // CLDR plural rules generated using
    // libs/CLDRPluralRuleParser/tools/PluralXML2JSON.html
    pluralRules: {
      ak: {
        one: 'n = 0..1'
      },
      am: {
        one: 'i = 0 or n = 1'
      },
      ar: {
        zero: 'n = 0',
        one: 'n = 1',
        two: 'n = 2',
        few: 'n % 100 = 3..10',
        many: 'n % 100 = 11..99'
      },
      ars: {
        zero: 'n = 0',
        one: 'n = 1',
        two: 'n = 2',
        few: 'n % 100 = 3..10',
        many: 'n % 100 = 11..99'
      },
      as: {
        one: 'i = 0 or n = 1'
      },
      be: {
        one: 'n % 10 = 1 and n % 100 != 11',
        few: 'n % 10 = 2..4 and n % 100 != 12..14',
        many: 'n % 10 = 0 or n % 10 = 5..9 or n % 100 = 11..14'
      },
      bh: {
        one: 'n = 0..1'
      },
      bn: {
        one: 'i = 0 or n = 1'
      },
      br: {
        one: 'n % 10 = 1 and n % 100 != 11,71,91',
        two: 'n % 10 = 2 and n % 100 != 12,72,92',
        few: 'n % 10 = 3..4,9 and n % 100 != 10..19,70..79,90..99',
        many: 'n != 0 and n % 1000000 = 0'
      },
      bs: {
        one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
      },
      cs: {
        one: 'i = 1 and v = 0',
        few: 'i = 2..4 and v = 0',
        many: 'v != 0'
      },
      cy: {
        zero: 'n = 0',
        one: 'n = 1',
        two: 'n = 2',
        few: 'n = 3',
        many: 'n = 6'
      },
      da: {
        one: 'n = 1 or t != 0 and i = 0,1'
      },
      dsb: {
        one: 'v = 0 and i % 100 = 1 or f % 100 = 1',
        two: 'v = 0 and i % 100 = 2 or f % 100 = 2',
        few: 'v = 0 and i % 100 = 3..4 or f % 100 = 3..4'
      },
      fa: {
        one: 'i = 0 or n = 1'
      },
      ff: {
        one: 'i = 0,1'
      },
      fil: {
        one: 'v = 0 and i = 1,2,3 or v = 0 and i % 10 != 4,6,9 or v != 0 and f % 10 != 4,6,9'
      },
      fr: {
        one: 'i = 0,1'
      },
      ga: {
        one: 'n = 1',
        two: 'n = 2',
        few: 'n = 3..6',
        many: 'n = 7..10'
      },
      gd: {
        one: 'n = 1,11',
        two: 'n = 2,12',
        few: 'n = 3..10,13..19'
      },
      gu: {
        one: 'i = 0 or n = 1'
      },
      guw: {
        one: 'n = 0..1'
      },
      gv: {
        one: 'v = 0 and i % 10 = 1',
        two: 'v = 0 and i % 10 = 2',
        few: 'v = 0 and i % 100 = 0,20,40,60,80',
        many: 'v != 0'
      },
      he: {
        one: 'i = 1 and v = 0',
        two: 'i = 2 and v = 0',
        many: 'v = 0 and n != 0..10 and n % 10 = 0'
      },
      hi: {
        one: 'i = 0 or n = 1'
      },
      hr: {
        one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
      },
      hsb: {
        one: 'v = 0 and i % 100 = 1 or f % 100 = 1',
        two: 'v = 0 and i % 100 = 2 or f % 100 = 2',
        few: 'v = 0 and i % 100 = 3..4 or f % 100 = 3..4'
      },
      hy: {
        one: 'i = 0,1'
      },
      is: {
        one: 't = 0 and i % 10 = 1 and i % 100 != 11 or t != 0'
      },
      iu: {
        one: 'n = 1',
        two: 'n = 2'
      },
      iw: {
        one: 'i = 1 and v = 0',
        two: 'i = 2 and v = 0',
        many: 'v = 0 and n != 0..10 and n % 10 = 0'
      },
      kab: {
        one: 'i = 0,1'
      },
      kn: {
        one: 'i = 0 or n = 1'
      },
      kw: {
        one: 'n = 1',
        two: 'n = 2'
      },
      lag: {
        zero: 'n = 0',
        one: 'i = 0,1 and n != 0'
      },
      ln: {
        one: 'n = 0..1'
      },
      lt: {
        one: 'n % 10 = 1 and n % 100 != 11..19',
        few: 'n % 10 = 2..9 and n % 100 != 11..19',
        many: 'f != 0'
      },
      lv: {
        zero: 'n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19',
        one: 'n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1'
      },
      mg: {
        one: 'n = 0..1'
      },
      mk: {
        one: 'v = 0 and i % 10 = 1 or f % 10 = 1'
      },
      mo: {
        one: 'i = 1 and v = 0',
        few: 'v != 0 or n = 0 or n != 1 and n % 100 = 1..19'
      },
      mr: {
        one: 'i = 0 or n = 1'
      },
      mt: {
        one: 'n = 1',
        few: 'n = 0 or n % 100 = 2..10',
        many: 'n % 100 = 11..19'
      },
      naq: {
        one: 'n = 1',
        two: 'n = 2'
      },
      nso: {
        one: 'n = 0..1'
      },
      pa: {
        one: 'n = 0..1'
      },
      pl: {
        one: 'i = 1 and v = 0',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
        many: 'v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14'
      },
      prg: {
        zero: 'n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19',
        one: 'n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1'
      },
      pt: {
        one: 'i = 0..1'
      },
      ro: {
        one: 'i = 1 and v = 0',
        few: 'v != 0 or n = 0 or n != 1 and n % 100 = 1..19'
      },
      ru: {
        one: 'v = 0 and i % 10 = 1 and i % 100 != 11',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
        many: 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14'
      },
      se: {
        one: 'n = 1',
        two: 'n = 2'
      },
      sh: {
        one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
      },
      shi: {
        one: 'i = 0 or n = 1',
        few: 'n = 2..10'
      },
      si: {
        one: 'n = 0,1 or i = 0 and f = 1'
      },
      sk: {
        one: 'i = 1 and v = 0',
        few: 'i = 2..4 and v = 0',
        many: 'v != 0'
      },
      sl: {
        one: 'v = 0 and i % 100 = 1',
        two: 'v = 0 and i % 100 = 2',
        few: 'v = 0 and i % 100 = 3..4 or v != 0'
      },
      sma: {
        one: 'n = 1',
        two: 'n = 2'
      },
      smi: {
        one: 'n = 1',
        two: 'n = 2'
      },
      smj: {
        one: 'n = 1',
        two: 'n = 2'
      },
      smn: {
        one: 'n = 1',
        two: 'n = 2'
      },
      sms: {
        one: 'n = 1',
        two: 'n = 2'
      },
      sr: {
        one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
      },
      ti: {
        one: 'n = 0..1'
      },
      tl: {
        one: 'v = 0 and i = 1,2,3 or v = 0 and i % 10 != 4,6,9 or v != 0 and f % 10 != 4,6,9'
      },
      tzm: {
        one: 'n = 0..1 or n = 11..99'
      },
      uk: {
        one: 'v = 0 and i % 10 = 1 and i % 100 != 11',
        few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
        many: 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14'
      },
      wa: {
        one: 'n = 0..1'
      },
      zu: {
        one: 'i = 0 or n = 1'
      }
    },
    // jscs:enable

    /**
     * Plural form transformations, needed for some languages.
     *
     * @param {integer} count
     *            Non-localized quantifier
     * @param {Array} forms
     *            List of plural forms
     * @return {string} Correct form for quantifier in this language
     */
    convertPlural: function convertPlural(count, forms) {
      var pluralRules,
          pluralFormIndex,
          index,
          explicitPluralPattern = new RegExp('\\d+=', 'i'),
          formCount,
          form;

      if (!forms || forms.length === 0) {
        return '';
      } // Handle for Explicit 0= & 1= values


      for (index = 0; index < forms.length; index++) {
        form = forms[index];

        if (explicitPluralPattern.test(form)) {
          formCount = parseInt(form.slice(0, form.indexOf('=')), 10);

          if (formCount === count) {
            return form.slice(form.indexOf('=') + 1);
          }

          forms[index] = undefined;
        }
      }

      forms = $.map(forms, function (form) {
        if (form !== undefined) {
          return form;
        }
      });
      pluralRules = this.pluralRules[$.i18n().locale];

      if (!pluralRules) {
        // default fallback.
        return count === 1 ? forms[0] : forms[1];
      }

      pluralFormIndex = this.getPluralForm(count, pluralRules);
      pluralFormIndex = Math.min(pluralFormIndex, forms.length - 1);
      return forms[pluralFormIndex];
    },

    /**
     * For the number, get the plural for index
     *
     * @param {integer} number
     * @param {Object} pluralRules
     * @return {integer} plural form index
     */
    getPluralForm: function getPluralForm(number, pluralRules) {
      var i,
          pluralForms = ['zero', 'one', 'two', 'few', 'many', 'other'],
          pluralFormIndex = 0;

      for (i = 0; i < pluralForms.length; i++) {
        if (pluralRules[pluralForms[i]]) {
          if (pluralRuleParser(pluralRules[pluralForms[i]], number)) {
            return pluralFormIndex;
          }

          pluralFormIndex++;
        }
      }

      return pluralFormIndex;
    },

    /**
     * Converts a number using digitTransformTable.
     *
     * @param {number} num Value to be converted
     * @param {boolean} integer Convert the return value to an integer
     * @return {string} The number converted into a String.
     */
    convertNumber: function convertNumber(num, integer) {
      var tmp, item, i, transformTable, numberString, convertedNumber; // Set the target Transform table:

      transformTable = this.digitTransformTable($.i18n().locale);
      numberString = String(num);
      convertedNumber = '';

      if (!transformTable) {
        return num;
      } // Check if the restore to Latin number flag is set:


      if (integer) {
        if (parseFloat(num, 10) === num) {
          return num;
        }

        tmp = [];

        for (item in transformTable) {
          tmp[transformTable[item]] = item;
        }

        transformTable = tmp;
      }

      for (i = 0; i < numberString.length; i++) {
        if (transformTable[numberString[i]]) {
          convertedNumber += transformTable[numberString[i]];
        } else {
          convertedNumber += numberString[i];
        }
      }

      return integer ? parseFloat(convertedNumber, 10) : convertedNumber;
    },

    /**
     * Grammatical transformations, needed for inflected languages.
     * Invoked by putting {{grammar:form|word}} in a message.
     * Override this method for languages that need special grammar rules
     * applied dynamically.
     *
     * @param {string} word
     * @param {string} form
     * @return {string}
     */
    // eslint-disable-next-line no-unused-vars
    convertGrammar: function convertGrammar(word, form) {
      return word;
    },

    /**
     * Provides an alternative text depending on specified gender. Usage
     * {{gender:[gender|user object]|masculine|feminine|neutral}}. If second
     * or third parameter are not specified, masculine is used.
     *
     * These details may be overriden per language.
     *
     * @param {string} gender
     *      male, female, or anything else for neutral.
     * @param {Array} forms
     *      List of gender forms
     *
     * @return {string}
     */
    gender: function gender(_gender, forms) {
      if (!forms || forms.length === 0) {
        return '';
      }

      while (forms.length < 2) {
        forms.push(forms[forms.length - 1]);
      }

      if (_gender === 'male') {
        return forms[0];
      }

      if (_gender === 'female') {
        return forms[1];
      }

      return forms.length === 3 ? forms[2] : forms[0];
    },

    /**
     * Get the digit transform table for the given language
     * See http://cldr.unicode.org/translation/numbering-systems
     *
     * @param {string} language
     * @return {Array|boolean} List of digits in the passed language or false
     * representation, or boolean false if there is no information.
     */
    digitTransformTable: function digitTransformTable(language) {
      var tables = {
        ar: '٠١٢٣٤٥٦٧٨٩',
        fa: '۰۱۲۳۴۵۶۷۸۹',
        ml: '൦൧൨൩൪൫൬൭൮൯',
        kn: '೦೧೨೩೪೫೬೭೮೯',
        lo: '໐໑໒໓໔໕໖໗໘໙',
        or: '୦୧୨୩୪୫୬୭୮୯',
        kh: '០១២៣៤៥៦៧៨៩',
        pa: '੦੧੨੩੪੫੬੭੮੯',
        gu: '૦૧૨૩૪૫૬૭૮૯',
        hi: '०१२३४५६७८९',
        my: '၀၁၂၃၄၅၆၇၈၉',
        ta: '௦௧௨௩௪௫௬௭௮௯',
        te: '౦౧౨౩౪౫౬౭౮౯',
        th: '๐๑๒๓๔๕๖๗๘๙',
        // FIXME use iso 639 codes
        bo: '༠༡༢༣༤༥༦༧༨༩' // FIXME use iso 639 codes

      };

      if (!tables[language]) {
        return false;
      }

      return tables[language].split('');
    }
  };
  $.extend($.i18n.languages, {
    'default': language
  });
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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/jquery.i18n.language.js"], null)
//# sourceMappingURL=/jquery.i18n.language.ac9b455e.map
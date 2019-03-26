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
})({"src/jquery.i18n.fallbacks.js":[function(require,module,exports) {
/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do anything special to
 * choose one license or the other and you don't have to notify anyone which license you are using.
 * You are free to use UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */
(function ($) {
  'use strict';

  $.i18n = $.i18n || {};
  $.extend($.i18n.fallbacks, {
    ab: ['ru'],
    ace: ['id'],
    aln: ['sq'],
    // Not so standard - als is supposed to be Tosk Albanian,
    // but in Wikipedia it's used for a Germanic language.
    als: ['gsw', 'de'],
    an: ['es'],
    anp: ['hi'],
    arn: ['es'],
    arz: ['ar'],
    av: ['ru'],
    ay: ['es'],
    ba: ['ru'],
    bar: ['de'],
    'bat-smg': ['sgs', 'lt'],
    bcc: ['fa'],
    'be-x-old': ['be-tarask'],
    bh: ['bho'],
    bjn: ['id'],
    bm: ['fr'],
    bpy: ['bn'],
    bqi: ['fa'],
    bug: ['id'],
    'cbk-zam': ['es'],
    ce: ['ru'],
    crh: ['crh-latn'],
    'crh-cyrl': ['ru'],
    csb: ['pl'],
    cv: ['ru'],
    'de-at': ['de'],
    'de-ch': ['de'],
    'de-formal': ['de'],
    dsb: ['de'],
    dtp: ['ms'],
    egl: ['it'],
    eml: ['it'],
    ff: ['fr'],
    fit: ['fi'],
    'fiu-vro': ['vro', 'et'],
    frc: ['fr'],
    frp: ['fr'],
    frr: ['de'],
    fur: ['it'],
    gag: ['tr'],
    gan: ['gan-hant', 'zh-hant', 'zh-hans'],
    'gan-hans': ['zh-hans'],
    'gan-hant': ['zh-hant', 'zh-hans'],
    gl: ['pt'],
    glk: ['fa'],
    gn: ['es'],
    gsw: ['de'],
    hif: ['hif-latn'],
    hsb: ['de'],
    ht: ['fr'],
    ii: ['zh-cn', 'zh-hans'],
    inh: ['ru'],
    iu: ['ike-cans'],
    jut: ['da'],
    jv: ['id'],
    kaa: ['kk-latn', 'kk-cyrl'],
    kbd: ['kbd-cyrl'],
    khw: ['ur'],
    kiu: ['tr'],
    kk: ['kk-cyrl'],
    'kk-arab': ['kk-cyrl'],
    'kk-latn': ['kk-cyrl'],
    'kk-cn': ['kk-arab', 'kk-cyrl'],
    'kk-kz': ['kk-cyrl'],
    'kk-tr': ['kk-latn', 'kk-cyrl'],
    kl: ['da'],
    'ko-kp': ['ko'],
    koi: ['ru'],
    krc: ['ru'],
    ks: ['ks-arab'],
    ksh: ['de'],
    ku: ['ku-latn'],
    'ku-arab': ['ckb'],
    kv: ['ru'],
    lad: ['es'],
    lb: ['de'],
    lbe: ['ru'],
    lez: ['ru'],
    li: ['nl'],
    lij: ['it'],
    liv: ['et'],
    lmo: ['it'],
    ln: ['fr'],
    ltg: ['lv'],
    lzz: ['tr'],
    mai: ['hi'],
    'map-bms': ['jv', 'id'],
    mg: ['fr'],
    mhr: ['ru'],
    min: ['id'],
    mo: ['ro'],
    mrj: ['ru'],
    mwl: ['pt'],
    myv: ['ru'],
    mzn: ['fa'],
    nah: ['es'],
    nap: ['it'],
    nds: ['de'],
    'nds-nl': ['nl'],
    'nl-informal': ['nl'],
    no: ['nb'],
    os: ['ru'],
    pcd: ['fr'],
    pdc: ['de'],
    pdt: ['de'],
    pfl: ['de'],
    pms: ['it'],
    pt: ['pt-br'],
    'pt-br': ['pt'],
    qu: ['es'],
    qug: ['qu', 'es'],
    rgn: ['it'],
    rmy: ['ro'],
    'roa-rup': ['rup'],
    rue: ['uk', 'ru'],
    ruq: ['ruq-latn', 'ro'],
    'ruq-cyrl': ['mk'],
    'ruq-latn': ['ro'],
    sa: ['hi'],
    sah: ['ru'],
    scn: ['it'],
    sg: ['fr'],
    sgs: ['lt'],
    sli: ['de'],
    sr: ['sr-ec'],
    srn: ['nl'],
    stq: ['de'],
    su: ['id'],
    szl: ['pl'],
    tcy: ['kn'],
    tg: ['tg-cyrl'],
    tt: ['tt-cyrl', 'ru'],
    'tt-cyrl': ['ru'],
    ty: ['fr'],
    udm: ['ru'],
    ug: ['ug-arab'],
    uk: ['ru'],
    vec: ['it'],
    vep: ['et'],
    vls: ['nl'],
    vmf: ['de'],
    vot: ['fi'],
    vro: ['et'],
    wa: ['fr'],
    wo: ['fr'],
    wuu: ['zh-hans'],
    xal: ['ru'],
    xmf: ['ka'],
    yi: ['he'],
    za: ['zh-hans'],
    zea: ['nl'],
    zh: ['zh-hans'],
    'zh-classical': ['lzh'],
    'zh-cn': ['zh-hans'],
    'zh-hant': ['zh-hans'],
    'zh-hk': ['zh-hant', 'zh-hans'],
    'zh-min-nan': ['nan'],
    'zh-mo': ['zh-hk', 'zh-hant', 'zh-hans'],
    'zh-my': ['zh-sg', 'zh-hans'],
    'zh-sg': ['zh-hans'],
    'zh-tw': ['zh-hant', 'zh-hans'],
    'zh-yue': ['yue']
  });
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/jquery.i18n.fallbacks.js"], null)
//# sourceMappingURL=/jquery.i18n.fallbacks.3f272bc0.map
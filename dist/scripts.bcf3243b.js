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
})({"js/i18n/sk.json":[function(require,module,exports) {
module.exports = {
  "product": "Produkt"
};
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _sk = _interopRequireDefault(require("../js/i18n/sk.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 'use strict';
document.addEventListener('DOMContentLoaded', function () {
  // References to the HTML elements
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  var monthlyDepositInput = $('#monthly-deposit-input');
  var investmentYearsInput = $('#investment-years-input');
  var investmentYearsValue = $('#investment-years-value');
  var computedValuesTable = $('#computed-values-table');
  var monthlyDepositInput2 = $('#monthly-deposit-input2');
  var inputType = $('#tedt');
  var test1 = 0;
  var allValue = 0; // Percentage revenue constants
  // Multiply value with 100 and you will get value in %

  var TOP_TEN = {
    OPTIMISTIC: [2, 4, 6, 8, 10],
    REALISTIC: [2, 4, 6, 8, 10],
    PESSIMISTIC: [2, 4, 6, 8, 10]
  };
  var ALT_TEN = {
    OPTIMISTIC: [4, 8, 12, 16, 20],
    REALISTIC: [4, 8, 12, 16, 20],
    PESSIMISTIC: [4, 8, 12, 16, 20]
  };

  var updateInvestmentYearsValue = function updateInvestmentYearsValue() {
    investmentYearsValue.text(investmentYearsInput.val());
  };

  var calculateInvestmentRevenue = function calculateInvestmentRevenue() {
    var investmentYears = Number(investmentYearsInput.val());
    var investmentMonths = investmentYears * 12;
    var monthlyDeposit = Number(monthlyDepositInput.val());
    var oneDeposit = Number(monthlyDepositInput2.val());
    $('#test').append("<div>".concat(allValue, "</div>  "));

    var revenuePercentage = function revenuePercentage() {
      var cryptoType = $('option[name=crypto-type]:selected').val();
      var investmentStrategy = $('input[name=investment-strategy]:checked').val();

      if (cryptoType === 'TOP_TEN') {
        return TOP_TEN[investmentStrategy][investmentYears - 1];
      } else {
        return ALT_TEN[investmentStrategy][investmentYears - 1];
      }
    }; // Clean computed values table


    computedValuesTable.empty(); // Compute revenue values and fill table

    var prav = $('option[name=tedt]:selected').val();

    if (prav === 'pravidelne') {
      $('#crypto-radio').val('TOP_TEN');
      $('#alt-ten-crypto-radio').hide();
      $('#monthly-deposit-input2').hide();
      $('#monthly-deposit-input').show();
      Array(investmentMonths).fill(monthlyDeposit).map(function (depositValue, index) {
        var currentMonth = investmentMonths - index;
        var monthlyRevenue = depositValue / 100 * 85 * (currentMonth / investmentMonths * revenuePercentage());
        test1 = 0; // console.log(test1);

        return Number(monthlyRevenue).toFixed(2);
      }).forEach(function (value, index) {
        // console.log(test1);
        test1 = value * 1 + test1;
        test1.toFixed(1);
        console.log('value' + value);
        console.log('dokopy' + test1);
        allValue = monthlyDeposit * investmentMonths; // console.log(test1);
        // computedValuesTable.append(`<tr><td>${index + 1}</td><td>${value}</td></tr>>`);
      });
    } else {
      $('#alt-ten-crypto-radio').show();
      $('#monthly-deposit-input2').show();
      $('#monthly-deposit-input').hide();
      Array(1).fill(oneDeposit).map(function (depositValue, index) {
        var currentMonth = investmentYears;
        var monthlyRevenue = oneDeposit / 100 * 85 * revenuePercentage();
        test1 = 0; // console.log(test1);

        return Number(monthlyRevenue).toFixed(2);
      }).forEach(function (value, index) {
        // console.log(test1);
        test1 = value * 1 + test1;
        test1.toFixed(1);
        console.log('value' + value);
        console.log('dokopy' + test1);
        allValue = oneDeposit; // console.log(test1);
        // computedValuesTable.append(`<tr><td>${index + 1}</td><td>${value}</td></tr>>`);
      });
    }

    $('#vklad > div').remove('div');
    $('#vklad').append("<div>".concat(allValue, "\u20AC</div>"));
    $('#zhodnotenie > div').remove('div');
    $('#zhodnotenie').append("<div>".concat(test1.toFixed(2), "\u20AC</div>"));
    var percentage = test1 / allValue * 100;
    perCirc($('#sellPerCirc'), percentage);
  }; // Set initial values


  updateInvestmentYearsValue();
  calculateInvestmentRevenue(); // Update investment years side label after every slider change
  // and update recalculate revenue

  investmentYearsInput.change(function () {
    updateInvestmentYearsValue();
    calculateInvestmentRevenue();
  }); // Recalculate revenue after every change of monthly deposit, crypto type or investment strategy

  monthlyDepositInput.change(function () {
    calculateInvestmentRevenue();
  });
  monthlyDepositInput2.change(function () {
    calculateInvestmentRevenue();
  });
  $('select[name=crypto-type]').change(function () {
    calculateInvestmentRevenue();
  });
  $('select[name=tedt]').change(function () {
    calculateInvestmentRevenue();
  });
  $('input[name=investment-strategy]').change(function () {
    calculateInvestmentRevenue();
  });
});

function perCirc($el, end, i) {
  if (end < 0) end = 0;else if (end > 1000) end = 1000;
  if (typeof i === 'undefined') i = 0;
  var curr = 1000 * i / 360;
  $el.find(".perCircStat").html(Math.round(curr) + "%");

  if (i <= 180) {
    $el.css('background-image', 'linear-gradient(' + (90 + i) + 'deg, transparent 50%, #ccc 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
  } else {
    $el.css('background-image', 'linear-gradient(' + (i - 90) + 'deg, transparent 50%, #3eac53 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
  }

  if (curr < end) {
    setTimeout(function () {
      perCirc($el, end, ++i);
    }, 1);
  }
}

var set_locale_to = function set_locale_to(locale) {
  if (locale) $.i18n().locale = locale;
};

jQuery(function () {
  $.i18n().load({
    'sk': './sk.json',
    'en': 'en.json'
  }).done(function () {
    set_locale_to(url('?locale'));
    History.Adapter.bind(window, 'statechange', function () {
      set_locale_to(url('?locale'));
    });
    $('.switch-locale').on('click', 'a', function (e) {
      e.preventDefault();
      History.pushState(null, null, "?locale=" + $(this).data('locale'));
    });
  });
});

var set_locale_to = function set_locale_to(locale) {
  if (locale) {
    $.i18n().locale = locale;
  }

  $('body').i18n();
};
},{"../js/i18n/sk.json":"js/i18n/sk.json"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55634" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.map
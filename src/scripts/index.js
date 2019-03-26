
// 'use strict';
import slovak from './i18n/sk.json'

document.addEventListener('DOMContentLoaded', function () {
    // References to the HTML elements
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    const monthlyDepositInput = $('#monthly-deposit-input');
    const investmentYearsInput = $('#investment-years-input');
    const investmentYearsValue = $('#investment-years-value');
    const computedValuesTable = $('#computed-values-table');
    const monthlyDepositInput2 = $('#monthly-deposit-input2');
    const inputType = $('#tedt');
    let test1 = 0;
    let allValue =0;


    // Percentage revenue constants
    // Multiply value with 100 and you will get value in %
    const TOP_TEN = {
        OPTIMISTIC: [2, 4, 6, 8, 10],
        REALISTIC: [2, 4, 6, 8, 10],
        PESSIMISTIC: [2, 4, 6, 8, 10]
    };

    const ALT_TEN = {
        OPTIMISTIC: [4, 8, 12, 16, 20],
        REALISTIC: [4, 8, 12, 16, 20],
        PESSIMISTIC: [4, 8, 12, 16, 20]
    };

    const updateInvestmentYearsValue = function () {
        investmentYearsValue.text(investmentYearsInput.val());
    };

    const calculateInvestmentRevenue = function () {
        const investmentYears = Number(investmentYearsInput.val());
        const investmentMonths = investmentYears * 12;
        const monthlyDeposit = Number(monthlyDepositInput.val());
        const oneDeposit = Number(monthlyDepositInput2.val());


        $('#test').append(`<div>${allValue}</div>  `);
        const revenuePercentage = function () {
            const cryptoType = $('option[name=crypto-type]:selected').val();

            const investmentStrategy = $('input[name=investment-strategy]:checked').val();

            if (cryptoType === 'TOP_TEN') {
                return TOP_TEN[investmentStrategy][investmentYears - 1];
            } else {
                return ALT_TEN[investmentStrategy][investmentYears - 1];
            }
        };

        // Clean computed values table
        computedValuesTable.empty();

        // Compute revenue values and fill table
        let prav = $('option[name=tedt]:selected').val();
        if (prav === 'pravidelne'){
            $('#crypto-radio').val('TOP_TEN');
            $('#alt-ten-crypto-radio').hide();
            $('#monthly-deposit-input2').hide();
            $('#monthly-deposit-input').show();

        Array(investmentMonths)
            .fill(monthlyDeposit)
            .map(function (depositValue, index) {
                const currentMonth = investmentMonths - index;
                const monthlyRevenue = ((depositValue/100)*85) * (currentMonth / investmentMonths * revenuePercentage());
                test1 = 0;
                // console.log(test1);
                return Number(monthlyRevenue).toFixed(2);

            })
            .forEach(function (value, index) {
                // console.log(test1);
                test1 = (value * 1) + test1  ;
                test1.toFixed(1);

                console.log('value'+ value);
                console.log('dokopy'+test1);
                 allValue = monthlyDeposit*investmentMonths;
                // console.log(test1);
                // computedValuesTable.append(`<tr><td>${index + 1}</td><td>${value}</td></tr>>`);

            });
        } else {
            $('#alt-ten-crypto-radio').show();
            $('#monthly-deposit-input2').show();
            $('#monthly-deposit-input').hide();

            Array(1)
                .fill(oneDeposit)
                .map(function (depositValue, index) {
                    const currentMonth = investmentYears;
                    const monthlyRevenue = ((oneDeposit/100)*85) * revenuePercentage();
                    test1 = 0;
                    // console.log(test1);
                    return Number(monthlyRevenue).toFixed(2);

                })
                .forEach(function (value, index) {
                    // console.log(test1);
                    test1 = (value * 1) + test1  ;
                    test1.toFixed(1);

                    console.log('value'+ value);
                    console.log('dokopy'+test1);
                    allValue = oneDeposit;
                    // console.log(test1);
                    // computedValuesTable.append(`<tr><td>${index + 1}</td><td>${value}</td></tr>>`);

                });
        }

        $('#vklad > div').remove('div');
        $('#vklad').append(`<div>${allValue}€</div>`);
        $('#zhodnotenie > div').remove('div');
        $('#zhodnotenie').append(`<div>${test1.toFixed(2)}€</div>`);
        const percentage = (test1 / allValue) * 100;
        perCirc($('#sellPerCirc'), percentage);

    };

    // Set initial values
    updateInvestmentYearsValue();
    calculateInvestmentRevenue();

    // Update investment years side label after every slider change
    // and update recalculate revenue
    investmentYearsInput.change(function () {
        updateInvestmentYearsValue();
        calculateInvestmentRevenue();
    });

    // Recalculate revenue after every change of monthly deposit, crypto type or investment strategy
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
    if (end < 0)
        end = 0;
    else if (end > 1000)
        end = 1000;
    if (typeof i === 'undefined')
        i = 0;
    var curr = (1000 * i) / 360;
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

var set_locale_to = function(locale) {
	if (locale)
	  $.i18n().locale = locale;
  };

  jQuery(function() {
	$.i18n().load( {
        'sk': 'slovak',
        'en': 'en.json'
	} ).done(function() {
	  set_locale_to(url('?locale'));

	  History.Adapter.bind(window, 'statechange', function(){
		set_locale_to(url('?locale'));
	  });

	  $('.switch-locale').on('click', 'a', function(e) {
		e.preventDefault();
		History.pushState(null, null, "?locale=" + $(this).data('locale'));
	  });
	});
  });

  var set_locale_to = function(locale) {
	if (locale) {
	  $.i18n().locale = locale;
	}
	$('body').i18n();
  };

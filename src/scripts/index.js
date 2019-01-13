
import Chart from 'chart.js';
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // References to the HTML elements
    const monthlyDepositInput = $('#monthly-deposit-input');
    const investmentYearsInput = $('#investment-years-input');
    const investmentYearsValue = $('#investment-years-value');
    const computedValuesTable = $('#computed-values-table');
    let test1 = 0;


    // Percentage revenue constants
    // Multiply value with 100 and you will get value in %
    const TOP_TEN = {
        OPTIMISTIC: [0.6, 1.2, 1.8, 2.4],
        REALISTIC: [0.6, 1.2, 1.8, 2.4],
        PESSIMISTIC: [0.6, 1.2, 1.8, 2.4]
    };

    const ALT_TEN = {
        OPTIMISTIC: [1.0, 2.0, 3.0, 4.0],
        REALISTIC: [1.0, 2.0, 3.0, 4.0],
        PESSIMISTIC: [1.0, 2.0, 3.0, 4.0]
    };

    const updateInvestmentYearsValue = function () {
        investmentYearsValue.text(investmentYearsInput.val());
    };

    const calculateInvestmentRevenue = function () {
        const investmentYears = Number(investmentYearsInput.val());
        const investmentMonths = investmentYears * 12;
        const monthlyDeposit = Number(monthlyDepositInput.val());
        const allValue = monthlyDeposit*investmentMonths;

        $('#test').append(`<div>${allValue}</div>  `)
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
        Array(investmentMonths)
            .fill(monthlyDeposit)
            .map(function (depositValue, index) {
                const currentMonth = investmentMonths - index;
                const monthlyRevenue = depositValue * (currentMonth / 60 * revenuePercentage());
                test1 = 0;
                // console.log(test1);
                return Number(monthlyRevenue).toFixed(2);

            })
            .forEach(function (value, index) {
                // console.log(test1);
                test1 = test1 + (value * (index + 1));
                test1.toFixed(1);
                console.log(test1);
                // console.log(test1);
                // computedValuesTable.append(`<tr><td>${index + 1}</td><td>${value}</td></tr>>`);

            });
        $('#vklad > div').remove('div');
        $('#vklad').append(`<div>${allValue}€</div>`);
        $('#zhodnotenie > div').remove('div');
        $('#zhodnotenie').append(`<div>${test1.toFixed(2)}€</div>`);




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

    $('select[name=crypto-type]').change(function () {
        calculateInvestmentRevenue();
    });

    $('input[name=investment-strategy]').change(function () {
        calculateInvestmentRevenue();
    });
});

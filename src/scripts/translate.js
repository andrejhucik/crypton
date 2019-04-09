'use strict';

$.setLanguage = function (langKey) {
    $.ajax(' i18/' + langKey + '.json', {
        type: 'GET',
        accept: 'application/json',
        success: function (data) {
            $('[data-translate]').each(function (index, element) {
                const key = $(element).data('translate');
                const message = data[key];

                $(element).text(message);
                    if(langKey !== 'sk') {
                        $('.learn-more').addClass('d-none');
                    } else {
                        $('.learn-more').removeClass('d-none');
                    }
            });
        }
    });
};


$.getQueryParam = function (name) {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
    return (results !== null) ? results[1] || 0 : false;
};

$.setQueryParam = function (param, value) {
    const currentValue = $.getQueryParam(param);
    if (currentValue) {
        location.href = location.href.replace(param + "=" + currentValue, param + "=" + value);
    } else {
        location.href = location.href.replace('#', '') + '?' + param + "=" + value;
    }


};

$(document).ready(function () {
    // Check for default language
    const langKey = $.getQueryParam('lang') || 'sk';
    // Update translation messages in DOM
    $.setLanguage(langKey);

    $('#lang-sk').click(function () {
        $.setQueryParam('lang', 'sk');
    });

    $('#lang-en').click(function () {
        $.setQueryParam('lang', 'en');
    });
    $('#lang-cz').click(function () {
        $.setQueryParam('lang', 'cz');
    });
    $('#lang-pl').click(function () {
        $.setQueryParam('lang', 'pl');
    });
    $('#lang-hu').click(function () {
        $.setQueryParam('lang', 'hu');
    });
    $('#lang-de').click(function () {
        $.setQueryParam('lang', 'de');
    });

});


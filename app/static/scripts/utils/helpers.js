'use strict';

/**
 * Модуль содержащий удобные методы для
 * работы с DOM, стороками и числами
 *
 * @module Helpers
 */

define([
    'jquery',
    'underscore',
    'handlebars',
    'jquery.cookie'
], function ($, _, Handlebars) {
    return {
        /**
         * TODO: в jquery есть такое же
         * Метод возвращает данные формы в виде объекта
         *
         * @deprecated
         * @method
         * @name Helpers.serializeFormObject
         * @param {jQuery} formElement ссылка на элемент формы
         * @returns {Object} сериализованная форма
         */
        serializeFormObject: function (formElement) {
            var formArray = formElement.serializeArray(),
                formObject = {};

            _.each(formArray, function (formField) {
                formObject[formField.name] = formField.value;
            });

            return formObject;
        },

        /**
         * Метод загружает шаблон по пути и рендерит его
         * Передает параметры в шаблон
         *
         * @method
         * @name Helpers.renderTemplate
         * @param {String} templatePath путь до шаблона
         * @param {Object} params параметры шаблона
         * @returns {jQuery.Deferred}
         */
        renderTemplate: function (templatePath, params) {
            var deferred = $.Deferred(),
                hbs = Soshace.hbs,
                path;

            path = Soshace.viewsPath + templatePath + '.hbs';

            if (hbs[path]) {
                return deferred.resolve(hbs[path](params));
            }

            $.get(path, function (contents) {
                var template = Handlebars.compile(contents);

                hbs[path] = template;
                deferred.resolve(template(params));
            }, 'text');

            return deferred;
        },

        /**
         * Метод приводит строки типа camel-case к виду camelCase
         *
         * @method
         * @name Helpers.camelCase
         * @param {String} value
         * @returns {string}
         */
        camelCase: function (value) {
            return $.camelCase(value);
        },

        /**
         * Метод приводит строки типа camel-case к виду camelCase
         *
         * @method
         * @name Helpers.camelCase
         * @param {String} value
         * @returns {string}
         */
        hyphen: function (value) {
            return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },

        /**
         * Метод возвращает сериализованный инпут
         *
         * @method
         * @name Helpers.serializeField
         * @param {jQuery} $input
         * @returns {Object}
         */
        serializeField: function ($input) {
            var value = $input.val(),
                name = $input.attr('name'),
                _this = this;

            return {
                name: _this.camelCase(name),
                value: $.trim(value)
            };
        },

        /**
         * Получаем локаль
         *
         * @public
         * @method
         * @name Helpers.getLocale
         * @return {String}
         */
        getLocale: function () {
            return $.cookie('locale') || 'en';
        },

        /**
         * Метод переводит переданныу строку
         *
         * @method
         * @name Helpers.i18n
         * @param {String} value
         * @returns {String}
         */
        i18n: function (value) {
            var locale = this.getLocale(),
                translations = Soshace.locales[locale];

            if (typeof translations === 'undefined') {
                return value;
            }

            if (typeof translations[value] === 'undefined') {
                return value;
            }

            return translations[value];
        },

        /**
         * Метод возвращает true, если есть поддержка History API
         *
         * @method
         * @name Helpers.checkHistoryApiSupport
         * @returns {boolean}
         */
        checkHistoryApiSupport: function () {
            return !!(window.history && history.pushState);
        }
    };
});
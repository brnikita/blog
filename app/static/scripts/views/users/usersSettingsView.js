'use strict';

/**
 * Вид страницы настроек пользователя
 *
 * @class UsersSettingsView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'utils/helpers',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone, Handlebars, Helpers) {
    return Backbone.Layout.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name UsersSettingsView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UsersSettingsView#elements
         * @type {Object}
         */
        elements: {
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UsersSettingsView#elements
         * @type {string}
         */
        template: Soshace.hbs['users/usersSettings'],

        /**
         * @constructor
         * @name UsersSettingsView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Handlebars.registerPartial(
                'usersTabs',
                Soshace.hbs['partials/usersTabs']
            );
        },

        /**
         * @method
         * @name UsersSettingsView#serialize
         * @returns {Object}
         */
        serialize: function () {
            var app = Soshace.app,
                isAuthenticated = app.isAuthenticated(),
                data = {},
                model = this.model.toJSON(),
                profile = Soshace.profile,
                isOwner = isAuthenticated && model._id === profile._id;

            data.user = model;
            data.isOwner = isOwner;
            data.isUserSettingsTab = true;
            data.locale = Helpers.getLocale();
            return data;
        },

        /**
         * Метод используется в тех случаях, когда шаблон уже отрендерен
         * Но надо навесить слушатели и выполнить afterRender и т.д.
         *
         * @method
         * @name UsersSettingsView#withoutRender
         * @returns {undefined}
         */
        withoutRender: function () {
            this.delegateEvents();
            this.afterRender();
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UsersSettingsView#setElements
         * @returns {undefined}
         */
        setElements: function () {
        },

        /**
         * @method
         * @name UsersSettingsView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
        }
    });
});
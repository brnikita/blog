'use strict';

/**
 * Вид страницы редактирования пользователя
 *
 * @class UsersEditView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'utils/helpers',
    'backbone.layoutmanager',
    'templates',
    'bootstrap.datepicker'
], function ($, _, Backbone, Handlebars, Helpers) {
    return Backbone.Layout.extend({
        /**
         * Модель деталей статьи
         *
         * @field
         * @name UsersEditView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * Ссылки на DOM элементы
         *
         * @field
         * @name UsersEditView#elements
         * @type {Object}
         */
        elements: {
            form: null,
            dates: null
        },

        /**
         * Список обработчиков событий
         *
         * @field
         * @name UsersEditView#events
         * @type {Object}
         */
        events: {
            'submit': 'submitHandler'
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name UsersEditView#elements
         * @type {string}
         */
        template: Soshace.hbs['users/usersEdit'],

        /**
         * @constructor
         * @name UsersEditView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Handlebars.registerPartial(
                'usersTabs',
                Soshace.hbs['partials/usersTabs']
            );
        },

        /**
         * Метод устанавливает данные в модель взятые из шаблона
         *
         * @method
         * @name UsersEditView#setModelFromTemplate
         * @returns {undefined}
         */
        setModelFromTemplate: function () {
            var $form = this.elements.form,
                userData = $form.data(),
                formData = this.getFormData();

            this.model.set(_.extend(formData, userData));
        },

        /**
         * Метод возвращает сериализованную форму
         *
         * @method
         * @name UsersEditView#getFormData
         * @returns {Object}
         */
        getFormData: function () {
            var $form = this.elements.form,
                serializedForm = $form.serializeArray();

            return _.object(_.map(serializedForm, function (field) {
                return [field.name, field.value];
            }));
        },

        /**
         * Метод обработчик отправки формы
         *
         * @method
         * @name UsersEditView#submitHandler
         * @param {jQuery.Event} event
         * @returns {undefined}
         */
        submitHandler: function (event) {
            var formData = this.getFormData(),
                diff;

            event.preventDefault();
            this.model.set(formData);
            diff = this.model.changed;

            if (_.isEmpty(diff)) {
                return;
            }

            Soshace.profile = this.model.toJSON();
            this.model.save(diff, {
                patch: true,
                success: _.bind(this.submitSuccessHandler, this),
                error: _.bind(this.submitErrorHandler, this)
            });
        },

        /**
         * Метод обработчик успешного сохранения данных пользователя
         *
         * @method
         * @name UsersEditView#submitSuccessHandler
         * @returns {undefined}
         */
        submitSuccessHandler: function () {

        },

        /**
         * Метод обработчик неудачного сохранения данных пользователя
         *
         * @method
         * @name UsersEditView#submitErrorHandler
         * @returns {undefined}
         */
        submitErrorHandler: function () {

        },

        /**
         * Метод используется в тех случаях, когда шаблон уже отрендерен
         * Но надо навесить слушатели и выполнить afterRender и т.д.
         *
         * @method
         * @name UsersEditView#withoutRender
         * @param {jQuery} $el родительский элемент вида
         * @returns {undefined}
         */
        withoutRender: function ($el) {
            this.$el = $el;
            this.delegateEvents();
            this.setElements();
            this.setModelFromTemplate();
            this.setDatesControls();
        },

        /**
         * @method
         * @name UsersEditView#serialize
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
            data.isUserEditTab = true;
            data.locale = Helpers.getLocale();
            data.sexList = this.model.getSexList();

            return data;
        },

        /**
         * Метод сохраняет DOM элементы
         *
         * @method
         * @name UsersEditView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.form = this.$('.js-form');
            this.elements.dates = this.$('.js-date');
        },

        /**
         * Метод применяет плагин календаря к полям
         *
         * @method
         * @name UsersEditView#setDatesControls
         * @returns {undefined}
         */
        setDatesControls: function () {
            var locale = Helpers.getLocale();

            this.elements.dates.datepicker({
                format: 'dd.mm.yyyy',
                language: locale
            });
        },

        /**
         * @method
         * @name UsersEditView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.setDatesControls();
        }
    });
});
'use strict';

/**
 * Вид предпросмотра статьи
 *
 * @class PostPreviewView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.layoutmanager',
    'templates'
], function ($, _, Backbone) {
    return Backbone.Layout.extend({

        /**
         * @field
         * @name PostPreviewView#el
         * @type {Boolean}
         */
        el: false,

        /**
         * Модель деталей статьи
         *
         * @field
         * @name PostPreviewView#model
         * @type {Backbone.Model | null}
         */
        model: null,

        /**
         * @field
         * @name PostPreviewView#elements
         * @type {Object}
         */
        elements: {
            toolbar: null
        },

        /**
         * Путь до шаблона
         *
         * @field
         * @name PostPreviewView#elements
         * @type {string}
         */
        template: Soshace.hbs['partials/postPreview'],

        /**
         * @constructor
         * @name PostPreviewView#initialize
         * @returns {undefined}
         */
        initialize: function () {
            Handlebars.registerPartial(
                'postMetadata',
                Soshace.hbs['partials/postMetadata']
            );
        },

        /**
         * Метод используется в тех случаях, когда шаблон уже отрендерен
         * Но надо навесить слушатели и выполнить afterRender и т.д.
         *
         * @method
         * @name PostPreviewView#withoutRender
         * @returns {undefined}
         */
        withoutRender: function () {
            this.delegateEvents();
            this.afterRender();
        },

        /**
         * Метод добавляет тулбар к превью статьи,
         * если статья принадлежит пользователю
         *
         * @method
         * @name PostPreviewView#addPostToolBar
         * @returns {undefined}
         */
        addPostToolBar: function () {
            var toolbar = this.getToolBar();
            this.elements.toolbar.html(toolbar);
        },

        /**
         * Метод возвращает отрендеренный тулбар для превью статьи
         *
         * @method
         * @name PostPreviewView#getToolBar
         * @returns {Object}
         */
        getStatusData: function () {
            var status = this.model.get('status'),
                statusSettings = this.model.statuses[status],
                statusClass = statusSettings.class,
                statusTitle = statusSettings.title,
                editorEnable = statusSettings.editorEnable;

            return  {
                editorEnable: editorEnable,
                statusClass: statusClass,
                statusTitle: statusTitle
            };
        },

        /**
         * Метод сохраняет ссылки на элементы DOM
         *
         * @method
         * @name PostPreviewView#setElements
         * @returns {undefined}
         */
        setElements: function () {
            this.elements.toolbar = this.$('.js-post-preview-toolbar');
        },

        /**
         * @method
         * @name PostPreviewView#afterRender
         * @returns {undefined}
         */
        afterRender: function () {
            this.setElements();
            this.addPostToolBar();
        }
    });
});
'use strict';

/**
 * Коллекция списка статей
 *
 * @class PostsListCollection
 */

define([
    'jquery',
    'underscore',
    'backbone',
    './postModel'
], function ($, _, Backbone, PostModel) {
    return Backbone.Collection.extend({
        /**
         * @field
         * @name PostsListCollection.model
         * @type {PostModel}
         */
        model: PostModel,

        /**
         * @method
         * @name PostsListCollection.initialize
         * @returns {string}
         */
        url: Soshace.urls.api.posts,

        /**
         * @constructor
         * @name PostsListCollection.initialize
         * @returns {undefined}
         */
        initialize: function () {
            _.bindAll(this, 'getPostsSuccess');
        },

        /**
         * @method
         * @name PostsListCollection.getPosts
         * @param {Array} routeParams параметры запроса
         * @returns {undefined}
         */
        getPosts: function (routeParams) {
            this.fetch({
                data: {
                    locale: routeParams[0],
                    page: routeParams[1]
                },
                silent: true
            }).done(this.getPostsSuccess);
        },

        /**
         * Метод обработчик удачного получения списка постов
         *
         * @method
         * @name PostsListCollection.getPostsSuccess
         * @param {Array} postsList список постов
         * @returns {undefined}
         */
        getPostsSuccess: function (postsList) {
            if (postsList instanceof Array && postsList.length === 0) {
                postsList = null;
            }
            this.set({posts: postsList}, {silent: true});
            this.trigger('postsReceived');
        }
    });
});
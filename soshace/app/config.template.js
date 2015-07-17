'use strict';

/**
 * ������������ �������
 */
global.Soshace = {
    /**
     * ��������� ����� ����������. ��������, ���� ����������
     * ������� �� ��������� ������ ����� IDE
     *
     * @public
     * @constant
     * name soshace.LOCAL_MACHINE
     * @type {Boolean}
     */
    LOCAL_MACHINE: true,

    /**
     * ������������ ���� �� ��������� ������
     *
     * @public
     * @constant
     * @name soshace.LOCAL_HOST
     * @type {String}
     */
    LOCAL_HOST: 'localhost',

    /**
     * @public
     * @constant
     * @name soshace.PRODUCTION_HOST
     * @type {String}
     */
    PRODUCTION_HOST: 'soshace.com',
    /**
     * ������, ������� �� package.json
     * �������� �������� ��������
     *
     * @field
     * @name Soshace.VERSION
     * @type {string}
     */
    VERSION: '0',

    /**
     * ���� �� �������� ���������� �������
     *
     * @field
     * @name Soshace.DIR_NAME
     * @type {string | null}
     */
    DIR_NAME: null,

    /**
     * ���������
     *
     * @field
     * @name Soshace.IS_PRODUCTION
     * @type {boolean}
     */
    IS_PRODUCTION: true,

    /**
     * ���� ���� ������
     *
     * @constant
     * @name Soshace.DB_HOST
     * @type {string}
     */
    DB_HOST: 'mongodb://localhost/soshace',

    /**
     * ���� ������� ������� ��� node.js ������
     *
     * @constant
     * @name Soshace.PORT
     * @type {string}
     */
    PORT: '8080',

    /**
     * ���� ������� ������� ��� node.js ������
     *
     * @constant
     * @name Soshace.HOST
     * @type {string}
     */
    HOST: '127.0.0.1',

    /**
     * ������ �� �������
     *
     * @constant
     * @name Soshace.DEFAULT_LOCALE
     * @type {string}
     */
    DEFAULT_LOCALE: 'ru',

    /**
     * ��������� ������
     *
     * @constant
     * @name Soshace.LOCALES
     * @type {String[]}
     */
    LOCALES: [
        'en',
        'ru'
    ],

    /**
     * ������ �������� �������
     * �������� ������ ���� � ��� �� �������, ��� � ������
     *
     * @constant
     * @name Soshace.LANGUAGES
     * @type {String[]}
     */
    LANGUAGES: [
        'English',
        'Russian'
    ],

    /**
     * ���������� ������ �� ��������
     *
     * @constant
     * @name Soshace.POSTS_PER_PAGE
     * @type {number}
     */
    POSTS_PER_PAGE: 10,
    /**
     * @constant
     * @name Soshace.MAIL_SERVICE
     * @type {String}
     */
    MAIL_SERVICE: 'yandex',

    /**
     * @constant
     * @name Soshace.MAIL_USER
     * @type {String}
     */
    MAIL_NO_REPLY: 'noreply@soshace.com',

    /**
     * @constant
     * @name Soshace.MAIL_PASSWORD
     * @type {String}
     */
    MAIL_NO_REPLY_PASSWORD: '',

    /**
     * ���� ������
     *
     * @constant
     * @name Soshace.SESSION_KEY
     * @type {String}
     */
    SESSION_KEY: 'session/key',

    /**
     * ������ ���������� ���������
     *
     * @constant
     * @name Soshace.PATTERNS
     * @type {Object}
     */
    PATTERNS: {
        email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        userName: /^[a-z\.\-_0-9]+$/
    },

    /**
     * ������ �����
     *
     * @constant
     * @name Soshace.PATHS
     * @type {Object}
     */
    PATHS: {
        static: '/static/',
        scripts: '/static/scripts/',
        styles: '/static/styles/',
        images: '/static/images/',
        backgrounds: '/static/images/backgrounds/',
        views: '/static/views/'
    },

    /**
     * ����� ���������� ���������� ��� ����� ������
     *
     * @method
     * @name Soshace.MEDIA_DIRECTORY
     * @returns {String}
     */
    MEDIA_DIRECTORY: function(){
        return this.DIR_NAME + '/media/';
    }
};
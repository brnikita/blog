'use strict';

//Импортируем глобальный объект soshace
require('./app/config');

var Express = require('express'),
    Package = require('./package'),
    App = new Express(),
    DbConnection = require('./app/src/common/dbConnection'),
    I18n = require('i18n-2'),
    Router = require('./app/src/router'),
    Handlebars = require('express3-handlebars');

var Blog = {
    /**
     * Инициализируем приложение
     *
     * @private
     * @function
     * @name Blog.initialize
     * @return {undefined}
     */
    initialize: function () {
        Soshace.VERSION = Package.version;
        Soshace.ENVIRONMENT = App.get('env');
        this.configure();
        //Подрубаемся к базе
        DbConnection.databaseOpen(function () {
            Router.init(App);
            App.listen(Soshace.PORT, Soshace.HOST);
        });

    },

    /**
     * Конфигурируем наше приложение
     *
     * @method
     * @name Blog.configure
     * @return {undefined}
     */
    configure: function () {
        App.use(Express.bodyParser());
        App.enable('view cache');
        App.set('views', 'app/views/');
        App.engine('hbs', new Handlebars({
            layoutsDir: 'app/views/layouts',
            partialsDir: 'app/views/partials',
            defaultLayout: 'layoutView',
            extname: '.hbs'
        }));

        App.set('view engine', 'hbs');
        I18n.expressBind(App, {
            locales: Soshace.LOCALES,
            directory: 'app/locales',
            extension: '.json',
            defaultLocale: Soshace.DEFAULT_LOCALE
        });
        App.use(App.router);

        //Устанавливаем ответ для 404
        App.use(function (request, response) {
            response.status(404);

            // respond with html page
            if (request.accepts('html')) {
                response.render('404', { url: request.url });
                return;
            }

            // respond with json
            if (request.accepts('json')) {
                response.send({ error: 'Not found' });
                return;
            }

            // default to plain-text. send()
            response.type('txt').send('Not found');
        });
    }
};

Blog.initialize();
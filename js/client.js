;(function(exports){
    "use strict"

    var $ = require('jQuery'), 
    _ = require('lodash'),
    Backbone = require('backbone'),
    MyViewConstructor = require('./TemplateView.js')
    Backbone.$ = $;
    

    Backbone.AppRouter = Backbone.Router.extend({
        initialize: function(){
            console.log('router initialized');
            this.homeView = new Backbone.HomeView()
            Backbone.history.start();
        },

        routes: {
            "*default": "goHome"
        },

        goHome: function(){
            console.log('homeRouterLoaded');
            this.homeView.render()
        },
    });

    Backbone.HomeView = MyViewConstructor.TemplateView.extend({
        el: '.wrapper',
        view: 'homepage'
    });

    exports.AppRouter = Backbone.AppRouter

})(typeof module === "object" ? module.exports : window)


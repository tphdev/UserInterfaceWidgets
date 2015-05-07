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
            this.homeView = new Backbone.HomeView();
            this.navExamplesView = new Backbone.NavExamplesView();
            Backbone.history.start();
        },

        routes: {
            "navigation-examples":"goNavExamples",
            "*default": "goHome"
        },

        goHome: function(){
            this.homeView.render()
        },

        goNavExamples: function(){
            this.navExamplesView.render()
        }
    });

    Backbone.HomeView = MyViewConstructor.TemplateView.extend({
        el: '.wrapper',
        view: 'homepage'
    });

     Backbone.NavExamplesView = MyViewConstructor.TemplateView.extend({
        el: '.wrapper',
        view: 'navigation-examples',

        events: {
            "click button": "popOutNav"
        },

        popOutNav: function(evt){
            evt.preventDefault();
            var evtTarget = $(evt.target);
            $('nav.cbp-spmenu-top').toggleClass('pop-out')
            evtTarget.toggleClass('popped')
            evtTarget.hasClass('popped') ? evtTarget.text('-') : evtTarget.text('+')
        },
    });

    exports.AppRouter = Backbone.AppRouter

})(typeof module === "object" ? module.exports : window)


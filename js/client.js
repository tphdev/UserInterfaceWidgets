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
            this.odysseyView = new Backbone.OdysseyView();
            this.menusAndModalsView = new Backbone.MenusAndModalsView();
            Backbone.history.start();
        },

        routes: {
            "menus-and-modals": "goMenusAndModals",
            "odyssey":"goNavExamples",
            "*default": "goHome",
        },

        goHome: function(){
            this.homeView.render();
        },

        goNavExamples: function(){
            this.odysseyView.render();
        },

        goMenusAndModals: function(){
            this.menusAndModalsView.render();
        }
    });

    Backbone.HomeView = MyViewConstructor.TemplateView.extend({
        el: '.wrapper',
        view: 'homepage'
    });

     Backbone.OdysseyView = MyViewConstructor.TemplateView.extend({
        el: '.wrapper',
        view: 'odyssey',

        events: {
            "click button.showMenu": "popOutNav",
            "click button.modal": "toggleModal",
            "click button.exit-modal": "toggleModal"
        },

        popOutNav: function(evt){
            evt.preventDefault();
            var evtTarget = $(evt.target);
            $('nav.cbp-spmenu-top').toggleClass('pop-out')
            evtTarget.toggleClass('popped')
            evtTarget.hasClass('popped') ? evtTarget.text('-') : evtTarget.text('+')
        },

        toggleModal: function(evt){
            evt.preventDefault();
            $('.md-effect').toggleClass('md-show');
            console.log('toggled')
        },
    });

    Backbone.MenusAndModalsView = MyViewConstructor.TemplateView.extend({
        el: ".wrapper",
        view: 'menus-and-modals'
    })

    exports.AppRouter = Backbone.AppRouter

})(typeof module === "object" ? module.exports : window)


;(function(exports){
    "use strict"

    var $ = require('jQuery'), 
    _ = require('lodash'),
    Backbone = require('backbone'),
    MyViewConstructor = require('./TemplateView.js')

    Backbone.$ = $,




    Backbone.AppRouter = Backbone.Router.extend({
        initialize: function(){
            console.log('router initialized');
            this.homeView = new Backbone.HomeView();
            this.odysseyView = new Backbone.OdysseyView();
            this.menusAndModalsView = new Backbone.MenusAndModalsView();
            this.detailsView = new Backbone.DetailsView();
            Backbone.history.start();
        },

        routes: {
            "details": "goToDetails",
            "menus-and-modals": "goMenusAndModals",
            "odyssey":"goNavExamples",
            "*default": "goHome",
        },

        goHome: function(){
            this.homeView.render();
        },

        goNavExamples: function(){
            this.odysseyView.render();
            window.scrollTo(0,0);

        },

        goMenusAndModals: function(){
            var self = this
            this.menusAndModalsView.render();
            window.scrollTo(0,0);

        },

        goToDetails: function(){
            var self = this;
            if(window){window.scrollTo(0,0);}

            this.detailsView.render();
            console.log('Element Not Found')
            this.detailsView.overlay();
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
        view: 'menus',

        events: {
            'click .menu-btn' : 'showSideMenu',
        },

        showSideMenu: function(evt){
            var menuTypeJQ = '.'+$(evt.target).attr('data-menuType')
            
            var $sideMenu = $(menuTypeJQ);
            var $divOverlay = $('.nav-screen-overlay');

            $(menuTypeJQ).addClass('extended');
            $divOverlay.addClass('show');

            $divOverlay.on('click', function(){
                $(this).removeClass('show');
                $sideMenu.removeClass('extended')
            });
        }

    })

    Backbone.DetailsView = MyViewConstructor.TemplateView.extend({
        el: '.wrapper',
        view: 'details',

        events: {
            'click .modal-btn': 'overlayHandler',
            'click .tab': 'tabHandler',
            'click .slide-btn': 'slideHandler',
            'click .toggle-content': 'accordionHandler',
        },

        overlayHandler: function(evt){
            console.log('.content-slider Found...')
            var cs = $('.content-slider');
            var insertOverlay = function(e){
                var effect = $(e.target).attr('data-effect');
                $('.mdl-context'+'.'+effect).addClass('mdl-show')
            }
            
            var removeOverlay = function(){
                $('.mdl-context').removeClass('mdl-show');
            }
            insertOverlay(evt);
            $('.mdl-overlay').on('click', removeOverlay)
            $('.exit-modal').on('click', removeOverlay)
        },

        tabHandler: function(evt){
            var $currentTab = $('.selected-tab'),
                $selectedTarget = $(evt.target),
                selectedIndex = $selectedTarget.index()+1;


            $currentTab.removeClass('selected-tab');
            $('.selected-article').removeClass('selected-article')

            console.log(selectedIndex+1)
            $selectedTarget.addClass('selected-tab');
            $('.tabs-content > article:nth-of-type('+selectedIndex+')').addClass('selected-article')
        },

        slideHandler: function(evt){
            var $selectedSlide = $(evt.target).closest('li'),
                eventIndex = $selectedSlide.index()+1


            console.log($selectedSlide)
            $('.current-slide').removeClass('current-slide')
            $('.current-content').removeClass('current-content')
            $selectedSlide.addClass('current-slide')
            $('ul > li:nth-of-type('+eventIndex+')').addClass('current-content')
            $('.top-slider-container').scrollTop(0)

            $('li.content-slide').each(function(index,value){
                if(index+1 > eventIndex){$(this).addClass('after')}
                    else{$(this).removeClass('after')}
            })
        },

        accordionHandler: function(evt){
            var $collapsibleContent = $('.collapsible-content')

            $collapsibleContent.slideToggle().toggleClass('extended')

            if( $collapsibleContent.hasClass('extended')){
                $('.toggle-content span').text('-');
                console.log('has extended')
            } else {
                $('.toggle-content span').text('+');
            }
        },
    })

    exports.AppRouter = Backbone.AppRouter

})(typeof module === "object" ? module.exports : window)


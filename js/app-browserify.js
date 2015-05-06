
"use strict";
// es6 polyfills, powered by babel
require("babel/register")

// other stuff that we don't really use in our own code
var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
var client = require("./client.js");

function app(){
    document.querySelector("html").style.opacity = 1;
    var startApp = new client.AppRouter()
}

window.onload = app

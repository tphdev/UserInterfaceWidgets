
"use strict";
// es6 polyfills, powered by babel
require("babel/register");

// other stuff that we don't really use in our own code
var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
var client = require("./client.js");

function app(){
    document.querySelector("html").style.opacity = 1;
    var startApp = new client.AppRouter()
}

//messin with ES6

//--------------------------
//anonymous function arrow syntax
var yellIt = (msg) => {
	return 'eeeeyyy '+msg+'!!'
}

var theMessage = yellIt('returning with arrows')

console.log(theMessage)

//-------------------------
//mappin arrow syntax

var family = [
	'Ed','Connie','Ben','Travis'
]
										
var nameLengthsES5 = family.map(function(name){
	return name.length;
})

							 //value    //return 
var nameLengthsES6 = family.map( (name,i,arr) =>{
	return name + " has " + name.length + " awesome points"
})


console.log(nameLengthsES6)

window.onload = app



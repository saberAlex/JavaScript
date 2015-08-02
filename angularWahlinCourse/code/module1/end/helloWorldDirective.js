//wapper function IIFE 
(function() {

    var app = angular.module('directivesModule', []);

    app.directive('helloWorld', function() {
    	//this is what you call DDOs
        return {
        	//this allow us to give literal string (output to the html)
            template: 'Hello World'
        };
    });

}());

angular.module('lucaReto.templates', ['ngRoute'])
//this is where we use our route provider
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/templates', {
			templateUrl: 'templates/templates.html',
			controller:'TemplatesCtrl'
		})
}])
.controller('TemplatesCtrl',['$scope', function($scope) {
	console.log('TemplatesCtrl Init');
	console.log($scope);
}]);
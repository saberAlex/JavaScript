'use strict';

// Declare app level module which depends on views, and components
angular.module('lucaReto', [
  'ngRoute',
  'lucaReto.view1',
  'lucaReto.view2',
  'lucaReto.templates'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/templates'});
}]).controller('mainController', function($scope) {
	$scope.weaponList = [ {
		name: "oblivion",
		power: 1000, 
	}, {
		name: "oath keeper",
		power: 2000, 
	}, {
		name: "oath promises",
		power: 3000
	}
	];
});



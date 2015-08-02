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
}]);

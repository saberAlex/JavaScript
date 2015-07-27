var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
    .when('/second/:num', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
});

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
        $scope.weaponName = [
      "oblivion",
      "oathKeeper",
      "ultimaWeapon"
    ];

    
    
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    


    
}]);

myApp.directive("searchResult", function() {
   return {
    //restrict give us  the IDEA which element we want to change:
    //A --> Attribute (see readme for detail)
    //E --> Element
    //M --> Comment
    //C --> class
       restrict: 'AECM',
       template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main St., New York, NY 11111</p></a>',
       replace: true
   }
});

myApp.directive("weaponList", function() {
  return {
    restrict: 'E',
    //the neat thing is that we can combine this with other angular services. Sweet,
    template: '<p  ng-repeat="weapon in weaponName">{{weapon}}</p>',
    //We can also separate the directive in seperate folder. Here I will show as below:
    //replace mean we completely replace our element with the template. 
    //Like this:
    //<!-- ngRepeat: weapon in weaponName --><p class="ng-binding ng-scope" ng-repeat="weapon in weaponName">oblivion</p><!-- end ngRepeat: weapon in weaponName --><p class="ng-binding ng-scope" ng-repeat="weapon in weaponName">oathKeeper</p><!-- end ngRepeat: weapon in weaponName --><p class="ng-binding ng-scope" ng-repeat="weapon in weaponName">ultimaWeapon</p><!-- end ngRepeat: weapon in weaponName -->
    replace: true
  }
})

myApp.directive("weaponListTemplate", function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/direct.html',
    replace: true
  }
})


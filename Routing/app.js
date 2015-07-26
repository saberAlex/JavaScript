var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    //config will inject the route provider.
    //$routeProvider: let us specify route: "What should I do when I see a particular url?"
    //We can create as many route as we want. 
    $routeProvider
    
    .when('/', {
        //templateUrl is our template that I will put in the index.html
        //controller will be the controller it will be connected to.
        //Remember I can have many controller in my angular module. 
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })

    .when('/weapon/:power', {
        templateUrl: 'pages/weapon.html',
        controller: 'weaponController'
    })
    
});

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    
    $scope.name = 'Main';
    
}]);

myApp.controller('secondController', ['$scope', '$log', function($scope, $log) {
    
    $scope.name = 'Second';
    
}]);

myApp.controller('weaponController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    $scope.name = 'Oath Keeper';
    console.log($routeParams);
      $(function() {
            $("#prog").progressbar({ 
                value: $routeParams.power
      })
    });
    
}]);

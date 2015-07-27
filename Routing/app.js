var myApp = angular.module('myApp', ['ngRoute']);

//creating a service, this service can be pass across the controller without the need of creating new object. 
myApp.service('nameService', function() {
    //self is use to refer to the service object, to pass the service between controller we just simply using the dependency injection. 
    var self = this;
    this.name = 'Terra';
    this.namelength = function() {
        return self.name.length;
    }

});

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

//we inject the service here:
myApp.controller('mainController', ['$scope', '$log','nameService',function($scope, $log, nameService) {
    
    $scope.name = 'Main';
    //because angular doesn't watch the service (only watch scope) we need to create our own watcher. so the value is change when we change anywhere. I will create an input type to demonstrate this.  without the watcher although the name change, it wont update the service value. but with watcher we can update this. 
    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });

    $scope.newParameter =  nameService.newParameter;


    
}]);

myApp.controller('secondController', ['$scope', '$log','nameService', function($scope, $log, nameService) {
    
    $scope.name = nameService.name;

    
}]);

myApp.controller('weaponController', ['$scope', '$log', '$routeParams', 'nameService',  function($scope, $log, $routeParams, nameService) {
    //Note: we can add a new property to the service and it can passed anywhere as long as we don't refresh the page. cool; Need to double check wheather this is a good practice or not. 
    $scope.$watch('name', function() {
            nameService.newParameter = "I can create a new object to my service WOW";
            console.log('Hello');
        });

    $scope.name = 'Oath Keeper';
    console.log($routeParams);
      $(function() {
            $("#prog").progressbar({ 
                value: $routeParams.power
      })
    });
    
}]);

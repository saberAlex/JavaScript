var pokeFight = angular.module('pokeFight',['ngRoute']);

pokeFight.service('pokedexService', function() {
    var self = this;

    this.fighterList = [
    	"charmander",
    	"pikachu"
    ],

this.fighter =  {
charmander: {
	name: "charmander",
	info: "The flame on its tail indicates CHARMANDERs life force. If it is healthy, the flame burns brightly.",
	photo: "img/pokemon/charmander/charmander.png",
	normal: "img/pokemon/charmander/charmander-normal.gif",
	sad: "img/pokemon/charmander/charmander-sad.gif",
	attack: "img/pokemon/charmander/charmander-tackle.gif",
	def: "img/pokemon/charmander/charmander-defense.gif",
	superAttack: "img/pokemon/charmander/charmander-super.gif",
	super: "ember",
	hp: 1000,
	defense: 50,
	power: 150,
	superPower: 400
}, 
pikachu: {
	name: "pikachu",
	info: "PIKACHU stores electricity in the electric sacs on its cheeks. When it releases pent-up energy in a burst, the electric power is equal to a lightning bolt.",
	photo: "img/pokemon/pikachu/pikachu.png",
	normal: "img/pokemon/pikachu/pikachu-normal.gif",
	sad: "img/pokemon/pikachu/pikachu-sad.gif",
	attack: "img/pokemon/pikachu/pikachu-tackle.gif",
	def: "img/pokemon/pikachu/pikachu-defense.gif",
	superAttack: "img/pokemon/pikachu/pikachu-super.gif",
	super: "thunder-bold",
	hp: 900,
	defense:80,
	power: 130,
	superPower: 300

}

};

    this.currentFighter = this.fighter.charmander;

});

pokeFight.config(function($routeProvider){
	$routeProvider

    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
	.when('/battle', {
		templateUrl: 'pages/battle.html',
		controller: 'battleController'
	})

});


pokeFight.controller('battleController', ['$scope', '$log', 'pokedexService','$interval', function($scope, $log, pokedexService, $interval) {
   
   $scope.currentFighter = pokedexService.currentFighter;
   
   $scope.myHP =  Math.round($scope.currentFighter.hp/10) + '%';
   $scope.$watch('currentFighter.hp', function() {
   	   $scope.myHP =  Math.round($scope.currentFighter.hp/10) + '%';
   });

    $scope.currentFighter.answer = '';
    $scope.counter = 0;



    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
        if($scope.showModal) {
    		var promise = $interval(function(){
    			$scope.countDown--;
    			if($scope.countDown < 1) {
    				$interval.cancel(promise);
    				$scope.showModal = false;
    			}
    		},1000,0);
        $scope.currentFighter.answer = '';
    	$scope.counter = 0;
    	$scope.superAttackResult = 0;
    	$scope.countDown = 10;
    	}

    };

    //For the progress bar
	$scope.charging = "0%";
    $scope.$watch('counter', function() {
    	  $scope.charging = $scope.counter*10 + '%';
    });

    $scope.plus1 = Math.floor((Math.random() * 15) + 1);
	$scope.plus2 =  Math.floor((Math.random() * 15) + 1); 
    $scope.submit = function() {
    	var result = $scope.plus1 + $scope.plus2;
    	if(result == parseInt($scope.currentFighter.answer) ) {
    		$scope.counter++;
    	}
    	$scope.currentFighter.answer = '';
        $scope.plus1 = Math.floor((Math.random() * 15) + 1);
		$scope.plus2 =  Math.floor((Math.random() * 15) + 1); 	
    }

}]);


pokeFight.controller('mainController', ['$scope', '$log', 'pokedexService',  function($scope, $log, pokedexService) {

     $scope.fighterList = pokedexService.fighterList;
     $scope.choose = function(poke) {
     	pokedexService.currentFighter = pokedexService.fighter[poke];
     };

}]);

// pokeFight.controller('superCtrl', ['$scope','$modal', '$log', function($scope, $modal, $log){
// $scope.ok = function () {
//     $modalInstance.close($scope.selected.item);
//   };

// }]);

pokeFight.directive('modal', function () {
    return {
      templateUrl: "directives/modalSuper.html",
      restrict: 'E',
      transclude: true,
      replace:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
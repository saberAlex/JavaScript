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


pokeFight.controller('battleController', ['$scope', '$log', 'pokedexService', function($scope, $log, pokedexService) {
   
   $scope.currentFighter = pokedexService.currentFighter;
   $scope.myHP = {
   	'width': Math.round($scope.currentFighter.hp/10) + '%'
   }

    
}]);


pokeFight.controller('mainController', ['$scope', '$log', 'pokedexService', function($scope, $log, pokedexService) {

     $scope.fighterList = pokedexService.fighterList;
     $scope.choose = function(poke) {
     	pokedexService.currentFighter = pokedexService.fighter[poke];
     };

}]);
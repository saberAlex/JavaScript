var pokeFight = angular.module('pokeFight',['ngRoute', 'ngResource']);

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
    this.dummyOpponent = {
      name: 'Moogle',
      photo: 'img/moogle/moogle.png',
      info: 'These mysterious beings tend to flock around humans, closer to man than beast. They communicate via their network Mognet and their distinctive cry of "Kupo!" and fluffy appearance endear them to all.',
      hp: 1000,
      defense: 90,
      power: 90,
      superPower: 350
    }
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


pokeFight.controller('battleController', ['$scope', '$log', 'pokedexService','$interval', '$timeout', '$http', function($scope, $log, pokedexService, $interval, $timeout, $http) {
   
   $scope.currentFighter = pokedexService.currentFighter;
   $scope.currentChatMessage = "say hi to your " + $scope.currentFighter.name;
   $scope.chatMessage = "hi there";
   $scope.enemy = pokedexService.dummyOpponent;
   $scope.showGameOver = false;
   $scope.myHP =  Math.round($scope.currentFighter.hp/10) + '%';
   $scope.$watch('currentFighter.hp', function() {
   	   $scope.myHP =  Math.round($scope.currentFighter.hp/10) + '%';
       if($scope.currentFighter.hp < 1) {
          $scope.showGameOver = true;
       }
   });

    $scope.currentFighter.answer = '';
    $scope.counter = 0;


    $scope.showNormalModal = false;
    $scope.toggleNormalModal = function() {
      $scope.showNormalModal = !$scope.showNormalModal;
      //simulating an opponent attack:
      $timeout( function() {
         $scope.currentFighter.currentAttack = $scope.currentFighter.power;
        $scope.currentFighter.currentDefense = 0;
        $scope.enemyAttack();
        $scope.currentFighter.hp = $scope.currentFighter.hp - $scope.enemy.currentAttack + $scope.currentFighter.currentDefense;
        $scope.enemy.hp = $scope.enemy.hp - $scope.currentFighter.currentAttack + $scope.enemy.currentDefense;
              $scope.showNormalModal = !$scope.showNormalModal;
      }, 3000);

       }

    $scope.showDefenseModal = false;
    $scope.toggleDefenseModal = function() {
      $scope.showDefenseModal = !$scope.showDefenseModal;

      $timeout( function() {
        $scope.currentFighter.currentAttack = $scope.currentFighter.power;
        $scope.currentFighter.currentDefense = 0;
        $scope.enemyAttack();
        $scope.currentFighter.hp = $scope.currentFighter.hp - $scope.enemy.currentAttack + $scope.currentFighter.currentDefense;
        $scope.enemy.hp = $scope.enemy.hp - $scope.currentFighter.currentAttack + $scope.enemy.currentDefense;
        $scope.showDefenseModal = !$scope.showDefenseModal;
      }, 3000);

       }
    

    $scope.showOpponent = false;
    $scope.toggleEnemyModal = function() {
      $scope.showOpponent = !$scope.showOpponent;
    }

    $scope.currentFighter.currentAttack = 0;
    $scope.currentFighter.currentDefense = 0;

    $scope.enemy.currentAttack = 0;
    $scope.enemy.currentDefense = 0;
    $scope.enemyAttack = function() {
        var chooseAttack = $scope.getRandomInt(1,4);
        if(chooseAttack == 1) {
          $scope.enemy.currentAttack = $scope.enemy.power;
          $scope.enemy.currentDefense = 0;
        } else if( chooseAttack == 2) {
          $scope.enemy.currentAttack = 0;
          $scope.enemy.currentDefense = $scope.enemy.defense*2;
        } else {
          $scope.enemy.currentAttack = $scope.getRandomInt(40,$scope.enemy.superPower);
          $scope.enemy.currentDefense = 0;
        }
    }


    //get random value, from min(included) to max(excluded)
    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
        if($scope.showModal) {
    		var promise = $interval(function(){
    			$scope.countDown--;
    			if($scope.countDown < 1) {

        $timeout( function() {
        $scope.currentFighter.currentAttack = $scope.currentFighter.superPower*$scope.counter/10;
        $scope.currentFighter.currentDefense = 0;
        $scope.enemyAttack();
        $scope.currentFighter.hp = $scope.currentFighter.hp - $scope.enemy.currentAttack + $scope.currentFighter.currentDefense;
        $scope.enemy.hp = $scope.enemy.hp - $scope.currentFighter.currentAttack + $scope.enemy.currentDefense;
      }, 3000);

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
     for(var i = 0; i < $scope.fighterList.length; i++) {

     }
     $scope.choose = function(poke) {
     	pokedexService.currentFighter = pokedexService.fighter[poke];
     };

}]);

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

pokeFight.directive('normalAttackModal', function() {
 return {
  templateUrl: "directives/normalAttack.html",
  restrict: 'E',
  transclude: true,
  replace: true,
  link: function postLink(scope, element, attrs) {
    scope.title = attrs.title;
    scope.$watch(attrs.visible, function(value) {
      if(value == true) {
        $(element).modal('show');
      } else {
        $(element).modal('hide');
      }
    });

    $(element).on('shown.bs.normalAttackModal', function(){
      scope.$apply(function() {
        scope.$parent[attrs.visible] = true;
      });
    });

    $(element).on('hidden.bs.normalAttackModal', function() {
      scope.$apply(function() {
        scope.$parent[attrs.visible] = false;
      });
    });
  }

 };
});

pokeFight.directive('defenseModal', function() {
  return {
    templateUrl: "directives/modalDefense.html",
    restrict: 'E',
    transclude: true,
    replace: true, 
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.defenseModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.defenseModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = false;
        })
      })


    }
  };
});

pokeFight.directive('enemyModal', function() {
  return {
    templateUrl: "directives/modalDefense.html",
    restrict:'E',
    transclude: true,
    replace: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });
      $(element).on('shown.bs.enemyModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = true;
        });
      });
      $(element).on('hidden.bs.enemyModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = false;
        })
      })

    }
  }
});

pokeFight.directive('gameOver', function() {
  return {
    templateUrl: "directives/modalDefense.html",
    restrict:'E',
    transclude: true,
    replace: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.gameOver', function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = true;
        });
      });
      $(element).on('hidden.bs.gameOver', function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = false;
        });
      });

    }
  }
})
var pokeFight = angular.module('pokeFight',['ngRoute', 'ngResource']);

pokeFight.service('pokedexService', function() {
    var self = this;

    this.fighterList = [
    	"vicky",
      "charmander",
    	"pikachu"
    ];


  this.allFighter =  {
    charmander: {
    	name: "charmander",
    	info: "The flame on its tail indicates CHARMANDERs life force. If it is healthy, the flame burns brightly.",
    	photo: "img/pokemon/charmander/charmander.png",
    	normal: "img/pokemon/charmander/charmander-normal.gif",
    	attack: "img/pokemon/charmander/charmander-tackle.gif",
    	def: "img/pokemon/charmander/charmander-defense.gif",
    	superAttack: "img/pokemon/charmander/charmander-super.gif",
    	super: "ember",
    	hp: 1000,
    	defense: 50,
    	power: 150,
    	superPower: 400
    }, 
    vicky: {
          name:"vicky",
          info:"When this CREATURE sings, it never pauses to breathe. that is to say, very annoying.",
          attack:"img/vikimon/vikimon01.jpg",
          normal:"img/vikimon/vikimon02.jpg",
          photo:"img/vikimon/vikimon03.jpg",
          def:"img/vikimon/vikimon01.jpg",
          superAttack:"img/vikimon/vikimon01.jpg",
          super: "Vicky gets really mad",
          hp: 1000,
          defense: 50,
          power: 150,
          superPower: 500
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

  this.currentFighter = this.allFighter.vicky;
  this.dummyOpponent = this.allFighter.pikachu;
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
   $scope.currentChatMessage = "say hi to " + $scope.currentFighter.name;
   $scope.chatMessage = "hi there";
   $scope.enemy = pokedexService.dummyOpponent;
   $scope.showGameOver = false;

   $scope.enemyHP =  Math.round($scope.enemy.hp/10) + '%';
    $scope.$watch('enemy.hp', function() {
       $scope.enemyHP =  Math.round($scope.enemy.hp/10) + '%';
       if($scope.enemy.hp < 1) {
          document.getElementById("backsound").pause();
          document.getElementById('finish').play();
          $scope.showGameOver = true;
       }
   });

   $scope.myHP =  Math.round($scope.currentFighter.hp/10) + '%';
   $scope.$watch('currentFighter.hp', function() {
   	   $scope.myHP =  Math.round($scope.currentFighter.hp/10) + '%';
       if($scope.currentFighter.hp < 1) {
          document.getElementById("backsound").pause();
          document.getElementById('finish').play();
          $scope.showGameOver = true;
       }
   });

    $scope.currentFighter.answer = '';
    $scope.counter = 0;


    $scope.showInfoModal = true;
    $scope.gameStart = false;
    $scope.beginGame = function() {
      $scope.gameStart = true;
      $scope.showInfoModal = false;
    }


    $scope.showNormalModal = false;
    $scope.toggleNormalModal = function() {
      $scope.showNormalModal = !$scope.showNormalModal;
      $scope.enemyAttack();
      $timeout( function() {
        $scope.currentFighter.currentAttack = $scope.currentFighter.power;
        $scope.currentFighter.currentDefense = 0;
        $scope.currentFighter.hp = $scope.currentFighter.hp - $scope.enemy.currentAttack + $scope.currentFighter.currentDefense;
        $scope.enemy.hp = $scope.enemy.hp - $scope.currentFighter.currentAttack + $scope.enemy.currentDefense;
              $scope.showNormalModal = !$scope.showNormalModal;
      }, 3000);

       }

    $scope.showDefenseModal = false;
    $scope.toggleDefenseModal = function() {
      $scope.showDefenseModal = !$scope.showDefenseModal;
      $scope.enemyAttack();
      $timeout( function() {
        $scope.currentFighter.currentAttack = $scope.currentFighter.power;
        $scope.currentFighter.currentDefense = $scope.currentFighter.defense*2;
        $scope.currentFighter.hp = $scope.currentFighter.hp - $scope.enemy.currentAttack + $scope.currentFighter.currentDefense;
        $scope.enemy.hp = $scope.enemy.hp - $scope.currentFighter.currentAttack + $scope.enemy.currentDefense;
        $scope.showDefenseModal = !$scope.showDefenseModal;
      }, 3000);

       }
    

    $scope.showOpponent = false;
    $scope.toggleEnemyModal = function() {
      $scope.showOpponent = !$scope.showOpponent;
    }


    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
        $scope.enemyAttack();
        if($scope.showModal) {
    		var promise = $interval(function(){
    			$scope.countDown--;
    			if($scope.countDown < 1) {
              $scope.currentFighter.currentAttack = $scope.currentFighter.superPower*$scope.counter/10;
              $scope.currentFighter.currentDefense = 0;
              $scope.currentFighter.hp = $scope.currentFighter.hp - $scope.enemy.currentAttack + $scope.currentFighter.currentDefense;
              $scope.enemy.hp = $scope.enemy.hp - $scope.currentFighter.currentAttack 
                              + $scope.enemy.currentDefense;
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
        document.getElementById('correct').play();
    	} else {
        document.getElementById('wrong').play();
      }
    	  $scope.currentFighter.answer = '';
        $scope.plus1 = Math.floor((Math.random() * 15) + 1);
		    $scope.plus2 =  Math.floor((Math.random() * 15) + 1); 	
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
          $scope.enemy.moves = $scope.enemy.name + " gets annoyed and then " + $scope.enemy.name + ' uses tackle.';
          $scope.enemy.movesPicture = $scope.enemy.attack;
        } else if( chooseAttack == 2) {
          $scope.enemy.currentAttack = 0;
          $scope.enemy.currentDefense = $scope.enemy.defense*2;
          $scope.enemy.moves = $scope.enemy.name + " takes a defensive stance.";
          $scope.enemy.movesPicture = $scope.enemy.def;
        } else {
          $scope.enemy.currentAttack = $scope.getRandomInt(40,$scope.enemy.superPower);
          $scope.enemy.currentDefense = 0;
          $scope.enemy.moves = $scope.enemy.name + "  becomes afraid and then " + $scope.enemy.name + ' uses ' + $scope.enemy.super + '.';
          $scope.enemy.movesPicture = $scope.enemy.superAttack;
        }
    }


    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $scope.done = function() {
      $scope.showGameOver = false;
    }
}]);


pokeFight.controller('mainController', ['$scope', '$log', 'pokedexService',  function($scope, $log, pokedexService) {
     $scope.allFighter = pokedexService.allFighter;
     function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
     }
        var opponent = getRandomInt(1,5);
        console.log(opponent);
        if(opponent < 3) {
          pokedexService.dummyOpponent = $scope.allFighter.charmander;
        } else {
          pokedexService.dummyOpponent = $scope.allFighter.pikachu;
        }
     pokedexService.currentFighter.hp = 1000;
     pokedexService.dummyOpponent.hp = 1000;
}]);


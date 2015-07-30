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

    //$log.info(hash);

//

//encodeURIComponent(JSON.stringify(object_to_be_serialised))
//apiKey: iOU0FdljMQohKPvu
//apiSecret: 1VW8Iwvj4GSTc5rwIYX6EuuGhdMLE0C8
 
    $scope.chatMessage = "hi there";
    $scope.sendChatMessage = function() {
              var chatUrl = 'http://www.personalityforge.com/api/chat/';
              var timestamp = Math.floor(Date.now() / 1000);
                var message =   {
          "message": {
            "message": $scope.chatMessage,
            "chatBotID": 110966,
            "timestamp": timestamp
          },
          "user": {
            "firstName": "Annez",
            "lastName": "Lee",
            "gender": "f",
            "externalID": "abc-" + $scope.currentFighter.name
          }

}


// <script src="http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/hmac-sha256.js"></script>
// <script src="http://crypto-js.googlecode.com/svn/tags/3.0.2/build/components/enc-base64-min.js"></script>

// <script>
//   var hash = CryptoJS.HmacSHA256("Message", "secret");
//   var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
//   document.write(hashInBase64);
// </script>

// var encodeMsg = JSON.stringify(message);
//           var hash = CryptoJS.HmacSHA256(encodeMsg,' 1VW8Iwvj4GSTc5rwIYX6EuuGhdMLE0C8');
//             //var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
//           var encodeToSend = encodeURIComponent(encodeMsg);
//           var apiKey = 'iOU0FdljMQohKPvu';

// chatUrl += "?apiKey="+apiKey + "&hash="+hash+"&message="+encodeToSend;
// console.log(chatUrl);

 var url ='http://www.personalityforge.com/api/chat/?apiKey=iOU0FdljMQohKPvu&chatBotID=110966&message=I+am+sorry+%3F&externalID=abc-639184572&firstName=Annez&lastName=Lee&gender=f';
 // $scope.weatherAPI = $resource(url, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
 //    delete $http.defaults.headers.common['X-Requested-With'];
 //     $scope.weatherResult = $scope.weatherAPI.get().toString();
 //     $log.info('bummer');
 //     $log.info($scope.weatherResult.toString());


var req = {
 method: 'GET',
 callback: "JSON_CALLBACK",
 headers: {
   'Content-Type': undefined
 },
 responseType:'text'


}

$http.jsonp(url, req).success(function(data){console.log(data).error(function(data, status) {
  console.log(data);
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
});
// $.ajax({
//     url: url,
//     dataType: 'JSONP',
//     jsonpCallback: 'callback',
//     type: 'GET',
//     success: function (data) {
//         console.log(data);
//     },
//         jsonp: 'jsonp'                                                                                                                                                
// });


// $http.jsonp(url)
//     .success(function (data, status, headers, config) {
//         alert("Hooray!");
//         $log.info(data);
//     })
//     .error(function (data, status, headers, config) {
//         alert("Dang It!");
//                 $log.info(data.toString());

//     });

     }
   


      
     //{ q: $scope.city, cnt: $scope.days }
    
    // $scope.convertToFahrenheit = function(degK) {
        
    //     return Math.round((1.8 * (degK - 273)) + 32);
        
    // }
    
    // $scope.convertToDate = function(dt) { 
      
    //     return new Date(dt * 1000);
        
    // };

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
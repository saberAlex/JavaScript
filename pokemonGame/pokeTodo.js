"use strict";
pokeFight.controller('parsetodoController', ['$scope', '$log','$rootScope','$location', function($scope, $log, $rootScope, $location) {

	Parse.initialize("ItkXGdBwyClFKSuiD4wg87AyNYWikSl71qWzEsDJ", "Div8j4m44QXp8NhNJumpwh3qfxA3AwaWLmiqvDej");
	
	$rootScope.isLogin = true;
	if($rootScope.isLogin != true) {
		$rootScope.isLogin = false;
	}

	$scope.user = {};
	$scope.submit = function() {
		var parseUser = new Parse.User();
		$log.info($scope.user.username + ' ' + $scope.user.password + ' ' + $scope.user.email);
		parseUser.set("username", $scope.user.username);
		parseUser.set("password", $scope.user.password);
		parseUser.set("email", $scope.user.email);
		parseUser.set("Level", 1);
		parseUser.set("EXP", 0);
		parseUser.set("TotalEXP",0);

		parseUser.signUp(null, {
			success: function(user) {
				$log.info("Sign up success");
				$rootScope.isLogin = true;
    			$rootScope.user = user;
    			$log.info($rootScope.user);
				changeLocation(""); //change location to Arena
			},
			error: function(user, error) {
				alert("Unable to sign up");
			}
		});

	}

		var changeLocation = function(url, force) {
  				//this will mark the URL change
  				$location.path(url); //use $location.path(url).replace() if you want to replace the location instead

  				$scope = $scope || angular.element(document).scope();
  				if(force || !$scope.$$phase) {
    			//this will kickstart angular if to notice the change
   				 $scope.$apply();
  }
};



	$scope.submitLogin = function() {
		Parse.User.logIn($scope.user.username, $scope.user.password, {
  			success: function(user) {
  				$rootScope.isLogin = true;
    			$rootScope.user = user;
    			$log.info($rootScope.user);
    			changeLocation(""); //change location to Arena

 			 },
  		error: function(user, error) {
   			   // The login failed. Check error to see why.
   			   alert('unable to log in... ');
  			}
});
	};

	$scope.logout = function() {
		Parse.User.logOut();
		$rootScope.isLogin = false;
	};

}]);


pokeFight.controller('levelupController', ['$scope', '$log','$rootScope','$location', function($scope, $log, $rootScope, $location) {

$scope.showNewTodo = false;
$scope.showTodo = false;
$scope.showTodolist = false;
	var currentUser = Parse.User.current();
      if (currentUser) {
    	// do stuff with the user
    	$rootScope.user = currentUser;
    	$scope.user = currentUser._serverData;
    	$scope.user.id = currentUser.id;
      	alert("I'm logged in");
      	$log.info($rootScope.user);
      	//Object {username: "lucareto", email: "luciaagastya@gmail.com", Level: 1, EXP: 0, TotalEXP: 0}
      } else {
    // show the signup or login page
    alert("error");
     }
	$scope.currentLevelDetail = {}
    retrieveCurrentLevel();

	$scope.todo ={};
	$scope.todo.total = 0;
	$scope.$watch("user.EXP", function() {
		$log.info($scope.user);
		$log.info($scope.currentLevelDetail);
			if($scope.user.EXP > $scope.currentLevelDetail.EXP) {
				var diff = $scope.user.EXP - $scope.currentLevelDetail.EXP;
				$rootScope.user.set("EXP", diff);
				$rootScope.user.set("Level", $scope.user.Level+1);
				$rootScope.user.set("TotalEXP", $scope.currentLevelDetail.TotalEXP+diff);
				$rootScope.user.save({
					success: function(currentUser) {
						$rootScope.user = currentUser;
    					$scope.user = currentUser._serverData;
    					$scope.user.id = currentUser.id;
    					retrieveCurrentLevel();
					}
				})

			} else {
				$rootScope.user.set("EXP", $scope.user.EXP);
				$rootScope.user.save();
				$scope.myHP =  Math.round($scope.user.EXP/$scope.currentLevelDetail.EXP) + '%';
			}
	});
	
	if($scope.user == null) {
		$scope.user = {};
		$scope.user.username = 'undefined';
		$scope.user.Level = 0;
	};

	$scope.createTodo = function() {
		$scope.showNewTodo = !$scope.showNewTodo;
		$scope.showTodolist = false;
		$scope.showTodo = false;
	}
	$scope.createDaily = function() {
		$log.info("Daily created");
	}
	$scope.openTodolist = function() {
		$scope.showTodolist = !$scope.showTodolist;
		//close everything if I close this:
		$scope.showTodo = false;
		$scope.showNewTodo = false;
	}

	//RETRIEVING LEVEL:
	function retrieveCurrentLevel() {
	var LevelObject = Parse.Object.extend("LevelObject");
	var query = new Parse.Query(LevelObject);
	query.equalTo("Level", $scope.user.Level);
	//only find the first element:
	query.first({
		  success: function(result) {
		   $scope.currentLevelDetail = result._serverData;
		   $scope.myHP =  Math.round($scope.user.EXP/$scope.currentLevelDetail.EXP) + '%';
		   $log.info($scope.myHP + "My HP");

		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
	});
	}
	//Retrieving TASK
	$scope.user.currentTaskList = [];
	$scope.user.completeTaskList = [];
	$scope.user.failedTaskList = [];

	var ToDosObject = Parse.Object.extend("ToDosObject");
	var queryTask = new Parse.Query(ToDosObject);
	queryTask.equalTo("userId", $scope.user.id);
	queryTask.find({
		  success: function(results) {
		    alert("Successfully retrieved " + results.length + " scores.");
		    // Do something with the returned Parse.Object values
		    for (var i = 0; i < results.length; i++) {
		    	if(results[i]._serverData.failed) {
		    		$scope.user.failedTaskList.push(results[i]);
		    	} else if(results[i]._serverData.complete) {
		    			$scope.user.completeTaskList.push(results[i]);
		    	} else {
		    	var task = results[i];
		    	var currentTime = Date.now();
		    	var diff = task._serverData.deadline - currentTime;
		    	$log.info(diff);
		    if (diff >0) {
		    	$scope.user.currentTaskList.push(task);
		    } else {
		    	results[i].set("failed", true);
		    	results[i].save( {
		    		success: function(object) {
		    			$scope.user.failedTaskList.push(object);
		    		}
		    	});
		    }
		    	}
		    }
		    $log.info($scope.user.currentTaskList);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
	});


	$scope.myHP =  Math.round($scope.user.EXP/10) + '%';
	$scope.today =  Date.now();



$scope.desc ="";
$scope.taskInput="";
$scope.dateInput;
$scope.saveTask = function() {
	if($scope.taskInput) {
		$log.info( $scope.taskInput + " " + $scope.dateInput);
		var ToDosObject = Parse.Object.extend("ToDosObject");
		var todo = new ToDosObject();
		todo.set("userId", $scope.user.id);
		todo.set("todo", $scope.taskInput);
		todo.set("deadline", $scope.dateInput);
		todo.set("failed", false);
		todo.set("complete", false);
		todo.set("descriptions", $scope.descriptions);
		todo.save( {
			success: function(object) {
				alert('Task saved');
				$scope.user.currentTaskList.push(object);
				$log.info("This is the newly created: ");
				$log.info($scope.user.currentTaskList[$scope.user.currentTaskList.length-1]);
			}, 
			error: function(model, error) {
       			alert('Unable to save task');
       			$log.info(error);
      		}
		});
	cleanTask();
	}
}

var cleanTask = function() {
	$scope.descriptions = "";
	$scope.taskInput = "";;
	$scope.dateInput = null;
}

$scope.showCurrentTask = function(key) {
	$log.info($scope.user.currentTaskList[key]);
	//retrieve:
   $scope.currentObject = $scope.user.currentTaskList[key];
   $scope.currentTodo = $scope.currentObject._serverData;
   $scope.currentTodo.id = $scope.currentObject.id;
   $scope.currentTodo.key = key;
   $scope.showTodo = true;
}

$scope.showFailedTask = function(key) {
$log.info($scope.user.failedTaskList[key]);
	//retrieve:
   $scope.currentObject = $scope.user.failedTaskList[key];
   $scope.currentTodo = $scope.currentObject._serverData;
   $scope.currentTodo.id = $scope.currentObject.id;
   $scope.currentTodo.key = key;
   $scope.showTodo = true;
}


$scope.showCompletedTaskView = false;
$scope.showFailedTaskView = false;

$scope.showCompletedTask = function(key) {
$log.info($scope.user.completeTaskList[key]);
	//retrieve:
   $scope.currentObject = $scope.user.completeTaskList[key];
   $scope.currentTodo = $scope.currentObject._serverData;
   $scope.currentTodo.id = $scope.currentObject.id;
   $scope.currentTodo.key = key;
   $scope.showTodo = true;
}
//For the task



$scope.updateTodoObject = function() {
	$scope.currentObject.set("todo", $scope.currentTodo.todo);
	$scope.currentObject.set("deadline", $scope.currentTodo.deadline);
		$scope.currentObject.set("descriptions", $scope.currentTodo.descriptions);
	$scope.currentObject.save();
	$scope.currentObject.updated = false;
}

$scope.deleteTodoObject = function() {
    $scope.currentObject.destroy( {
    	success: function() {
    		$scope.currentTodo = null;
    		}, 
    	error: function() {
    		alert("Unable to delete Object");
    	}
    });
    $scope.user.currentTaskList.splice($scope.currentTodo.key, 1);
    $scope.showTodo = false;
}

$scope.completeTodoObject = function() {
	$scope.currentObject.set("complete", true);
	$scope.user.currentTaskList.splice($scope.currentTodo.key, 1);
	$scope.currentObject.save({
		success: function(object) {
			$scope.user.completeTaskList.push(object);
			$scope.user.EXP += 6;
			$log.info(object);
		}
	});
}

}]);
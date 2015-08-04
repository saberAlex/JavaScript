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

	$scope.todo ={};
	$scope.todo.total = 0;

	
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
	var LevelObject = Parse.Object.extend("LevelObject");
	var query = new Parse.Query(LevelObject);
	query.equalTo("Level", $scope.user.Level);
	//only find the first element:
	query.first({
		  success: function(result) {
		   if(result) {
		   $scope.currentLevelDetail = result._serverData;
			}
		   //$log.info(result);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
	});

	//Retrieving TASK
	$scope.user.taskList = [];
	var ToDosObject = Parse.Object.extend("ToDosObject");
	var queryTask = new Parse.Query(ToDosObject);
	queryTask.equalTo("userId", $scope.user.id);
	queryTask.find({
		  success: function(results) {
		    alert("Successfully retrieved " + results.length + " scores.");
		    // Do something with the returned Parse.Object values
		    for (var i = 0; i < results.length; i++) {
		    	var task = results[i];
		    	$scope.user.taskList.push(task);
		    }
		    $log.info($scope.user.taskList);
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
				$scope.user.taskList.push(object);
				$log.info("This is the newly created: ");
				$log.info($scope.user.taskList[$scope.user.taskList.length-1]);
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
	$log.info($scope.user.taskList[key]);
	//retrieve:
   $scope.currentObject = $scope.user.taskList[key];
   $scope.currentTodo = $scope.currentObject._serverData;
   $scope.currentTodo.id = $scope.currentObject.id;
	$scope.currentTodo.key = key;
	   $scope.showTodo = true;


}
//For the task

$scope.deleteComplete = function( key ) {
	$scope.currentTodo.checklistComplete.splice(key, 1);

}

$scope.completeChecklist = function(key) {
	$scope.currentTodo.checklistComplete.push($scope.currentTodo.checklist[key]);
	$scope.currentTodo.checklist.splice(key, 1);
}

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
    $scope.user.taskList.splice($scope.currentTodo.key, 1);
    $scope.showTodo = false;
}

$scope.completeTodoObject = function() {
	$scope.currentObject.set("complete", true);
	$scope.currentObject.save();
}

}]);
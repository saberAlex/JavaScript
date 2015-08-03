
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
	}

	$scope.logout = function() {
		Parse.User.logOut();
		$rootScope.isLogin = false;
	}

}]);


pokeFight.controller('levelupController', ['$scope', '$log','$rootScope','$location', function($scope, $log, $rootScope, $location) {
	$scope.todo ={};
	$scope.user = {};
	$scope.user.username = 'lucareto';
	$scope.user.userlevel = '99';
	$scope.todo.total = 0;
	$scope.createTodo = function() {
		//create new todo.
		$log.info("Todo created");
	}
	$scope.createDaily = function() {
		$log.info("Daily created");
	}
	   $scope.myHP =  Math.round(800/10) + '%';


}]);
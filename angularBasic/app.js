//Not poluting the global namespace. 
//We only put one variable. 
//[] is the dependency array, it contains of the list of module that myApp depends on
var myApp = angular.module('myApp',['ngMessages', 'ngResource']);


//instead of using this to define our module: we can use another way to avoid minification problem
//What is minification? Make your code smaller so it faster to load. It also RENAME VARIABLE!!! this is really bad 
//If we minify we can change the variable input in the angular.module(), angular cannot find the variable.
//This broke the angular JS dependency injection. so we can use another way:

//Example this doing the form validation. 
//now we need to put this to the html.  MV*
//Which part of the view this apps live: well, here, in the html: <html ng-app="myApp">
//myApp.controller('mainController', function($scope, $log, $filter, $resource){
myApp.controller('mainController', ['$scope','$log','$filter','$resource', '$timeout',function($scope, $log, $filter, $resource, $timeout){


	//the object order($scope, $log) doesn't matter. What matter is the name.
	//now we need to connect this to the html: it can be a sub part of html.
	//$scope is an object. (this is one of angular JS services)
	//Angular js injects this to the function. 
	//We can also add this scope another value:
	$scope.weapon ="sword";
	$scope.getWeapon = function() {
		//this object become the scope object
		console.log(this.weapon);
	}

	$scope.getWeapon();
	console.log($scope);

	//How does  Angular do dependency injection. 
	//First is an object. and it will parse. 
	$log.log("Hello this is just a simple log");
	$log.info("This is an information");
	$log.warn("This is a warning");
	$log.debug("This is a Debug");
	$log.error("This is an error");

	//Another service from Angular JS: filter service. 
	//use dependency injection 
	//filter has a lot of function. on of them is an uppercase:
	$scope.name = 'John';
	$scope.formattedName = $filter('uppercase')($scope.name);

	$log.info($scope.name  + " " + $scope.formattedName);

	//lets look the angular messages service: further detail in documentation
	//it is named as a module. ng-something.
	//We can add it after the angularmin

	//Remember, whatever inside the scope is available inside the controller html,
	//so we can interpolate using {{}}, the angular js will look at the scope for that variable. 

	$timeout(function() {
		$scope.weapon="I will magically change";
	}, 3000);

	$scope.handle='';
	$scope.lower =  function() {
		return $filter('uppercase')($scope.handle);
	};


	// $scope.$apply( function() {
	// 	//this part of code will be watch by angular even though the context is different.
	// 	//How do I know when I should use this apply?

	// });
	$scope.characters=5;

	$scope.keyblade = [{
		id:1,
		name:"oathkeeper",
		power: 1000 
	},{ id: 2,
		name:"oblivion",
		power: 1000
	}

	];

	//we can also add our own specific watcher
	$scope.$watch('handle', function(newValue, oldValue){
		$log.error("Watch this");
		for(var i = 1; i <= $scope.keyblade.length;i++) {
			$scope.keyblade[i-1].power -= 50;
			var valueNow = Math.round($scope.keyblade[i-1].power/10);
			console.log(valueNow);
			  $(function() {
			$("#object-"+i).progressbar({ 
				value: valueNow
			});
		});
		}
		});	


}]);

//now this function sitting in the global space:
var searchPeople = function searchPeople(firstName, lastName, age) {
	console.log("People not found")
}

console.log(searchPeople);
//invoke the function: call the function, add pharantesis to the end 
//of the  function : searchPeople()
//What really nice, in java script we can actually convert a function 
//to a string in java script. like shown below:
//so... any function can have sting representation .. and we can parse 
//the  string. and make the decision with what the parameter is. 
//This is exactly what angular js does.
var stringFunction = searchPeople.toString();


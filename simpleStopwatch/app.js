//Not poluting the global namespace. 
//We only put one variable. 
//[] is the dependency array, it contains of the list of module that myApp depends on
var myApp = angular.module('myApp',[]);

myApp.controller('simpleController', ['$scope', '$interval',function($scope,$interval){

	    $scope.timer = 30*60;
	$scope.starting = false;
    $scope.startTimer = function(){
    	$scope.starting = !$scope.starting;
        if($scope.starting) {
    		var promise = $interval(function(){
    			$scope.timer--;
    			if($scope.timer < 1) {
    				document.getElementById('startsong').play();
            		$interval.cancel(promise);
    				$scope.starting = false;
    			}
    		},1000,0);
    	}

    };


}]);


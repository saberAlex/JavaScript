var app = angular.module('simpleApp', []);

app.controller('MainCtrl', function($scope, $http, $log) {
  $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];
  $scope.checklist = [];
  $scope.dataInput = "";
  $scope.addToModel = function() {
  	if($scope.checklist.length < 8) {
  	$scope.checklist.push($scope.dataInput);

  	} else {
  		alert('unable to add more');
  	}
  	  	$log.info($scope.dataInput + " " + $scope.checklist.length);

  	$scope.dataInput = "";
  }
  $scope.testVariable = "This is test";

  $scope.deleteList = function( ind ) {

	$scope.checklist.splice(ind, 1);
	  	  	$log.info($scope.dataInput + " " + $scope.checklist.length);

}
});


/*
First, find the index of the element you want to remove:

var array = [2, 5, 9];
var index = array.indexOf(5);
Note: browser support for indexOf is limited, it is not supported in IE7-8.

Then remove it with splice:

if (index > -1) {
    array.splice(index, 1);
}
*/
//removing the index
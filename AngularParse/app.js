
var myApp = angular.module('angularParse',['ngMessages', 'ngResource']);
myApp.controller('mainController', ['$scope','$log','$filter','$resource', '$timeout','$http',function($scope, $log, $filter, $resource, $timeout, $http){

	var geocoder = new google.maps.Geocoder();
	$scope.location="";
	$scope.coordinate;
	$scope.result;
	//the summary: result.currently.summary and temperature: result.currently.temperature

	$scope.getForecast = function() {
		console.log("testing ng-click");
		if (geocoder) {
      	geocoder.geocode({ 'address': $scope.location }, function (results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
            $scope.coordinate = results[0].geometry.location;
            console.log( typeof $scope.coordinate.A);
            console.log( typeof $scope.coordinate.F);
            var forecastCoordinate =Math.round($scope.coordinate.A*1000)/1000+","+Math.round($scope.coordinate.F*1000)/1000; 
   //          $http({
			//     method: 'JSONP',
			//     url: 'https://api.forecast.io/forecast/6fd61f79599ec5433797dad83429f757/' + forecastCoordinate
			// })
   //       		 .success(function(data, status) {
   //       		 	console.log( data);
   //       		 }).error(function(data) {
   //       		 	$log.error("Unable to retrieve the data")
   //       		 })

         }
         else {
            console.log("Geocoding failed: " + status);
         }
      });
   }    

	}



}]);


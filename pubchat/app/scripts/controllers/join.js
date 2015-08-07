'use strict';

/**
 * @ngdoc function
 * @name pubchatApp.controller:JoinCtrl
 * @description
 * # joinCtrl
 * Controller of the pubchatApp
 */
angular.module('pubchatApp')
  .controller('JoinCtrl', ["$scope","$log","$rootScope","$location","PubNub", function ($scope, $log,$rootScope, $location, PubNub) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.data = {
    	username: "User_" + Math.floor(Math.random() * 1000)
    }

    $scope.join = function() {
    	console.log("joining...");
    	var _ref, _ref1;
    	$rootScope.data || ($rootScope.data = {});
    	//if the user name is not null than we save it to the root scope.
    	$rootScope.data.username = (_ref =$scope.data) !=null ? _ref.username : void 0;
    	$rootScope.data.city = (_ref1 = $scope.data) != null? _ref1.city : void 0;
    	$rootScope.data.uuid = Math.floor(Math.random() * 1000000) + "__" + $scope.data.username;
    	$log.info($rootScope);

    	PubNub.init({
    		subscribe_key: "sub-c-025f4076-3d0a-11e5-8b46-02ee2ddab7fe",
    		publish_key: "pub-c-43e45c68-6f5d-45d6-9b25-9f22844edfe9",
    		uuid: $rootScope.data.uuid
    	});

    	return $location.path("/main");
   }

  }]);

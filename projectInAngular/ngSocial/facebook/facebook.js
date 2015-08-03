'use strict';

angular.module('myApp.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('425828247628020');
  $facebookProvider.setPermissions("email,public_profile,user_posts,publish_actions,user_photos");
})


.run( function( $rootScope ) {
   (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

})


.controller('FacebookCtrl', ['$scope','$facebook', '$log',function($scope, $facebook, $log) {
	$scope.isLoggedIn = false;

	$scope.login = function() {
		$facebook.login().then( function() {
			console.log('LOGIN IN');
			$scope.isLoggedIn = true;
			refresh();
		});
	}

	$scope.logout = function() {
		$facebook.logout().then(function() {
			$scope.isLoggedIn = false;
			refresh();
		})
	}

	function refresh() {
		$facebook.api("/me").then(function(response) {
			$scope.welcomeMessage = 'Welcome ' + response.name;
			$scope.isLoggedIn = true;
			$scope.userInfo = response;
			$log.info($scope.userInfo);
		$facebook.api('/me/permissions').then(function(response) {
			$log.info(response);
		});
		$facebook.api('/me/posts').then(function(response){
			console.log(response.data);
		});


		}, 
		function(error) {
			$scope.welcomeMessage = "Please Logged in";
		});
	}


refresh();


	$scope.postStatus = function() {
		var body = this.body;
		$facebook.api('/me/feed','post', {
			message: body
		}).then(function(response) {
			$scope.msg ='This is posting';
			refresh();
		})
	}

}]);

//use ng-if to display
angular.module('LoginMod').controller('LoginCtrl',['$scope', '$http', 'toastr', function($scope, $http, toastr){
	console.log('Login Controller initialized...');

	$scope.runLogin = function() {
		console.log("Login Submitted");
		$http.put("/login", {
			email: $scope.email,
			password:$scope.password
		}).then(function onSuccess() {
			window.location = "/dashboard";
		}).catch ( function onError(err){
			if(err.status == 400 | 404) {
				//using toastr
				toastr.error("Invalid Credentials", "Error", {
					closeButton: true
				});
				return;
			}

				toastr.error("An error has occured, please try again later", "Error", {
					closeButton: true
				});
				return;
		})
	}

}])
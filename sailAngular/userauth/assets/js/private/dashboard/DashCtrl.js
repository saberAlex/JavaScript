angular.module('DashMod').controller('DashCtrl',['$scope', '$http', 'toastr', function($scope, $http, toastr){
	$scope.getUser = function() {
		console.log("Getting user");

		$http.get("/getuser").then(function onSuccess(user) {
			console.log(user);
			$scope.user = user.data;
		})
		.catch(function onError(err) {
			console.log(err);
		})
	}


}])
//using route param:
declare in the module: 

.controller('tempCtrl', .....function($routeParams, $http, $filter)){
	//getting the route parameter"
	var templateId = $routeParams.templateId;
	$http.get('the url').success(function(data){
		$scope.template = $filter('filter')(data, function(d){
			return d.id == templateId;
		})[0];
		$scope.MainImage = $scope.template.images[0].name;
	})

}])
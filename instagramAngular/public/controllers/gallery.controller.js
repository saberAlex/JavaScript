angular.module("galPhoto")
.controller("GalleryCtrl", ["$scope", "$log", "instagram", "Lightbox", function($scope, $log, instagram, Lightbox){
	$log.info("This is up and running");
	$scope.images = [];
	 var imgArray = [];
	instagram.fetchPopular( function(data) {
		$log.info(data);
		$scope.images = data;
		angular.forEach(data, function(value, key) {
			imgArray.push(value.images.standard_resolution);
		});
		$scope.openLightboxModal = function(index) {
			Lightbox.openModal(imgArray, index);
		}

	});



}]);
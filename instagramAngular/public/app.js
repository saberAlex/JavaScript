var app = angular.module("galPhoto", ["ngRoute", "ngResource","bootstrapLightbox"]);

//this is where we define our route. 
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/gallery", {
		templateUrl: "views/gallery.view.html",
		controller: "GalleryCtrl"
	})
	.otherwise({redirectTo: "/gallery"});
}]);
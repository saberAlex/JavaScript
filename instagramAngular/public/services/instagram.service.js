//creating the instagram services:
angular.module("galPhoto")
//a factory is a kind of object that we want to inject to our application.
.factory("instagram", function($resource) {
	//we need to return popular image from instagram...
	return {
		fetchPopular: function(callback) {
			var api = $resource("https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK", {
				client_id: "307a8f34ed0547ba84391e217394c14c"
			}, {
				fetch: {method: "JSONP"}
			});

			api.fetch( function(response) {
				callback(response.data);
			})
		}
	}

})
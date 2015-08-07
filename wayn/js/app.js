"use strict";
(function() {

    var mapGeoLocation = ['$window',"$http","$log", function($window, $http, $log) {
        var template = '<p><span id="status">i hope i found you...</span></p>' +
                       '<br /><div id="map"></div>',
            mapContainer = null,
            status = null;

        function link(scope, elem, attrs) {
          //this give the status and mapContainer can use the JQLite wrapper
           status = angular.element(document.getElementById('status'));
           mapContainer = angular.element(document.getElementById('map'));

           mapContainer.attr('style', 'height:' + scope.height +
                             'px;width:' + scope.width + 'px; border-radius: 5px; border-style: solid; border-color: #000000;');
           $window.navigator.geolocation.getCurrentPosition(mapLocation, geoError);
        }

        function mapLocation(pos) {
              status.html("i hope mr spider didn't lie to me...");
              var latlng = new google.maps.LatLng(pos.coords.latitude,
                                                  pos.coords.longitude);
              var options = {
                zoom: 15,
                center: latlng,
                mapTypeControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              //this will take the mapContainer.. create a map in the div
              var map = new google.maps.Map(mapContainer[0], options);

              var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title:"Your location"
              });
        }

        function geoError(error) {
           status.html('please tell mr. spider');
        }

      

        return {
           scope: {
               height: '@',
               width: '@',
           },
           link: link,
           template: template
        };
    }];

  angular.module('whereAreYou', [])
  	.controller("whereCtrl", ["$scope", "$http","$window","$log", function($scope, $http, $window,$log){
  		$scope.showCalculatingDistance = true;
  		$scope.showResult = false;
  		$scope.showMap = true;
  		$scope.place = "....";
  		$scope.distance;

  		$scope.$watch("place", function() {
  			$log.info($scope.place);
  		})
  		$window.navigator.geolocation.getCurrentPosition(mapLocation, getError);

	//Calculates distance as the crow flies
		function calculateDistance(lat1, lon1, lat2, lon2){
		  //calculation from http://www.movable-type.co.uk/scripts/latlong.html
		  var R = 3958.76; // miles
		  
		  //Setting
		  var latRads1 = toRadians(lat1);
		  var latRads2 = toRadians(lat2);
		  var latDeltaRads = toRadians(lat2-lat1);
		  var lonDeltaRads = toRadians(lon2-lon1);
		  
		  var a = Math.sin(latDeltaRads/2) * Math.sin(latDeltaRads/2) +
		          Math.cos(latRads1) * Math.cos(latRads2) *
		          Math.sin(lonDeltaRads/2) * Math.sin(lonDeltaRads/2);
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		  return (R * c).toFixed(1); 
		}

		function toRadians(value) {
		  	return value * Math.PI / 180;
		}

        function mapLocation(pos) {
        $scope.showCalculatingDistance = false;
  		$scope.showResult = true;
  		$scope.distance = calculateDistance(pos.coords.latitude, pos.coords.longitude, 56.333476,-2.781181);
  		//using ajax:
  		var yourLocation = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude;
		$http.get(yourLocation).then(function(object) {
		      var currentAdds = object.data.results[0].address_components;
		      for(var i = 0; i < currentAdds.length; i++) {
		      	if(currentAdds[i].types[0] == "postal_town") {
		      		$log.info(currentAdds[i].long_name);
		      		$scope.place = currentAdds[i].long_name;
		      	}
		      }
		  	});
		}


	  function getError(error) {
	  	console.log(error);
	  }


  	}])
    .directive('mapGeoLocation', mapGeoLocation);

}());

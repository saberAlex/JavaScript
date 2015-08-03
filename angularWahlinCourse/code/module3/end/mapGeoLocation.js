(function() {

    var mapGeoLocation = ['$window', function($window) {
        var template = '<p><span id="status">looking up geolocation...</span></p>' +
                       '<br /><div id="map"></div>',
            mapContainer = null,
            status = null;

        function link(scope, elem, attrs) {
          //this give the status and mapContainer can use the JQLite wrapper
           status = angular.element(document.getElementById('status'));
           mapContainer = angular.element(document.getElementById('map'));

           mapContainer.attr('style', 'height:' + scope.height +
                             'px;width:' + scope.width + 'px');
           //this is the HTML5 to track your location, and the callback function is mapLocation and geoError.
           $window.navigator.geolocation.getCurrentPosition(mapLocation, geoError);
        }

          function mapLocation(pos) {
              status.html('Found your location! Longitude: ' + pos.coords.longitude +
                          ' Latitude: ' + pos.coords.latitude);

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
           status.html('failed lookup ' + error.message);
        }


        return {
           scope: {
               height: '@',
               width: '@'
           },
           link: link,
           template: template
        };
    }];

  angular.module('directivesModule', [])
    .directive('mapGeoLocation', mapGeoLocation);

}());

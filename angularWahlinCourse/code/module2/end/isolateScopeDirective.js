(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScope', function () {
      return {
          scope: {}, //this is the isolate scope!! because of this no data can't be displayed
          			 //how to poke the wall then??
          template: 'Name: {{customer.name}} Street: {{customer.street}}'
      };
  });

}());

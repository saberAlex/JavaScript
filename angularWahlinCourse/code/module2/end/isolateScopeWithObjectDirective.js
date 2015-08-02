(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithObject', function () {
      return {
          scope: {
             datasource: '='
             //this is for TWO ways data BINDING, this allow any type of scenario to be pass like ex: object
             //here we don't need to use the {{}}!!
          },
          template: 'Name: {{datasource.name}} Street: {{datasource.street}}' +
                    '<br /><button ng-click="datasource.name=\'Fred\'">' +
                    'Change</button>'
      };
  });

}());

(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithEvent', function () {
      return {
          scope: {
              datasource: '=',
              action: '&'
              //This is really cool!! You can pass a function, function callback
              //Thing of this as a function pointer.
              //        <isolate-scope-with-event datasource="customer" action="changeData()">
              //if we call action() we will run changeData() from our controller
              //Note that the order of the scope doesn't have any effect

          },
          template: 'Name: {{datasource.name}} Street: {{datasource.street}} ' +
                    '<button ng-click="action()">Change Data</button>'
      };
  });

}());

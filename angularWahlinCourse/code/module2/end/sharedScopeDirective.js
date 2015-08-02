(function() {

  var app = angular.module('directivesModule');

  app.directive('sharedScope', function () {
    return {
    //we can write something like this so the template can use the data from the controller
      template: 'Name: {{customer.name}} Street: {{customer.street}}'
    };
  });

}());

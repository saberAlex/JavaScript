(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithString', function () {
      return {
          scope: {
              name: '@' 
              //Local scope property
              //@ represents the string value (building a pipeline)
              //This is a ONE-way binding, with this I know what is the property that I use (got some track)
              //thus we can use that value:    
                //<isolate-scope-with-string name="{{customer.name}}"></isolate-scope-with-string>
                //we can also use something like this: @fullname 
                //<isolate-scope-with-string fullname="{{customer}}"></isolate-scope-with-string>
          },
          template: 'Name: {{name}}'
      };
  });

}());

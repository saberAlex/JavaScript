(function() {

  var controllerAs = function () {

      var link = function(scope, elem, attrs, tableHelperCtrl, transclude) {
        //we need to find the tr and transclude the tr... 
        //transclude is a function... which give the callback. 
          transclude(scope, function(content) {

              var th = angular.element('<th mapsto="' + scope.mapsto + '">' +
                                       content.html() + '</th>');
              th.on('click', function() {
                  scope.$apply(function() { //this will make this is in thecontrol of angular. 
                    tableHelperCtrl.sort(scope.mapsto);
                  });
              });

              elem.replaceWith(th); //the element still represent the <header></header>
              //replace the element: <header into the th>

          });
      };

      return {
          restrict: 'E',
          transclude: true,
          require: '^tableHelper', //go up to the parent (because we want to use a sort function)
          scope: {
              mapsto: '@'
          },
          link: link
      };
  };

  angular.module('directivesModule')
    .directive('header', controllerAs);

}());

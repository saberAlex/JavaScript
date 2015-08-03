(function() {

  var withController = function () {

    var template = '<button ng-click="addItem()">Add Item</button><ul>' +
                 '<li ng-repeat="item in items">{{ ::item.name }}</li></ul>',

        controller = ['$scope', function($scope) {

            init();

            function init() {
               $scope.items = angular.copy($scope.datasource);
            }

            $scope.addItem = function() {
                var name = 'New Directive Controller Item';
                //invoke this function??? WHY???
                $scope.add()(name); //lecture 39!!!
                /*
                  1) $scope is an object
                  2) $scope has a property attached to it named 'add' that must be a function that takes no arguments
                  3) Which when called, also returns a function that requires a single argument.

                */
                $scope.items.push({
                    name: name
                });
            }

        }];

      return {
          restrict: 'EA', //Default in 1.3+
          scope: {
              datasource: '=',
              add: '&',
          },
          controller: controller,
          template: template
      };
  };

  angular.module('directivesModule')
    .directive('withController', withController);

}());

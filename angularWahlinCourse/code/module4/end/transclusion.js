(function() {

  var transclusion = function () {
      var template = '<div>Name: <input type="text" ng-model="vm.title" />&nbsp;' +
        '<button ng-click="vm.addTask()">Add Task</button>' +
        '<div class="taskContainer"><br />' +
        '<ng-transclude></ng-transclude>' +
        '</div></div>',

      controller = function () {
          var vm = this;

          vm.addTask = function () {

            if (!vm.tasks) vm.tasks = [];

              vm.tasks.push({
                title: vm.title
              });

          };
      };

      return {
          restrict: 'E',
          transclude: true,
          scope: {
            tasks: '='
          },
          controller: controller,
          controllerAs: 'vm',
          bindToController: true,
          template: template
      };
  };

  angular.module('directivesModule')
    .directive('transclusion', transclusion);

}());

/*
 The ng-repeat in that scenario is getting "tasks" from the higher level controller (directivesController.js) which isn't using controller as. That content is then "merged" into the directive. You'll find that particular controller in the "scripts" folder in the code download.

*/
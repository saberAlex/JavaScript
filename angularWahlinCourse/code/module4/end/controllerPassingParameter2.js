(function() {

    var controllerPassingParameter2 = function () {

        var controller = function () {

            var vm = this;

            init();

            function init() {
                vm.items = angular.copy(vm.datasource);
            }

            vm.addItem = function () {
                var foo = 'New Customer Added by Directive: vm.add()(name)';

                //Call external scope's function
                vm.add()(foo); //get reference to the external function.. 
                //add ="addCustomer" --> this is passing a customer.. we need to invoked.
                //get to the function and then invoke the function. Neat

                //Add new item to directive scope
                vm.items.push({
                    name: foo
                });
            };
          },

          template = '<button ng-click="vm.addItem()">Add Item</button><ul>' +
                     '<li ng-repeat="item in vm.items">{{ ::item.name }}</li></ul>';

           return {
                restrict: 'EA',
                scope: {
                    datasource: '=',
                    add: '&',
                },
                controller: controller,
                controllerAs: 'vm',
                bindToController: true,
                template: template
            };
    };

    angular.module('directivesModule')
      .directive('controllerPassingParameter2', controllerPassingParameter2);
}());

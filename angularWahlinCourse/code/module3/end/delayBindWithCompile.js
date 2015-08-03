(function() {

    var delayBindWithCompile = ['$interpolate', function ($interpolate) {

        var compile = function(tElem, tAttrs) {
            console.log('In compile');
            //what is this interpolate? cause the delay-bind to be parse
            var interpolateFunc = $interpolate(tAttrs.delayBind);
            //this is allows to set the value..
            tAttrs.$set('delayBind', null); //Clear it out so no bindings occur, because we set to null

            return {
                pre: function(scope, elem, attrs) {
                    console.log('In delayBind pre ' + elem[0].tagName);
                },
                //this is will delay the show of directive
                post: function(scope, elem, attrs) {
                    console.log('In delayBind pre ' + elem[0].tagName);
                    //trigger is the event. 
                    elem.on(attrs.trigger, function(event) {
                        var attr = attrs.attribute,
                        //bind into url.. title...
                            val = interpolateFunc(scope);
                            //this is the first time
                        if (attr && !elem.attr(attr)) {
                            elem.attr(attr, val);
                        }
                    });
                }
            };

        };

      return {
          restrict: 'A',
          //this is to trigger the compil e first
          compile: compile
      };
  }];

  angular.module('directivesModule')
    .directive('delayBind', delayBindWithCompile);

}());

$parse, $eval()
$interpolate??
is Link() always the most appropriate??
etc...

This module focus on DOM deliver directive
link function is all about the dom manipulation 

link: function(scope, element, attrs){} --we can have more--
Note: the scope can be isolate or shared (depends on how you set the directives)
	  attrs is all the attribute of our directive tag.
	  AngularJS use jqLite to modify the document.

key jqLite Functions
angular.element()
addClass()/css()
attr()
on()/off()
find() --only find by tag name.

angular.element is the jqlite functionality
look at ngModel.ngModelController
Read about what is $modelValue and $viewValue

$parse and $eval --> we need to convert the data that the user provide
using $compile and $interpolate. 
	{ compile: this is to accessing the raw template... and store it }
	compile - pre-link (RARELY USED) - link/post-link
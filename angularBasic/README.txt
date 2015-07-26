A custom Attribute is an atrribute that is not standardize. 
The browser usually doesn't care about this attribute. 
A simple example:
<p weapon="oblivion"></p>
This will not effect how it visualize on your browser, but this is 
being consodered in the HTML5

An example of angular atribute is: 
ng-????. There are several types of this attributes. 


Start simple webservice:
 python -m SimpleHTTPServer 8080


The scope service
$this is the one that bind model to the view. 

Another important service is ng-resorce, it gives you the good way to connect with REST service. 

 ng-if remove/ allow the pieces of the dom to be updated. 
 <div class="alert" ng-if="handle.length!==characters">Must be 5 character</div>;
 there is also ng-show; that show if the value is true.

   	<div class="alert" ng-class="{'alert-danger': handle.length > 9}" ng-if="handle.length!==characters">Must be 5 character</div>

	ng-class can give class attribute to dom  based on the condition. 


There is another handy angular directives, for example when we want to hide the interpolation in our html.
In this case we can use ng-cloak. example:
  	<h1 ng-cloak>HELLO {{weapon + ".WOW."}}</h1>


Error example:
This is an example of error reference:
Uncaught Error: [$injector:modulerr] http://errors.angularjs.org/1.2.25/$injector/modulerr?p0=myApp&p1=Error%3A%…gleapis.com%2Fajax%2Flibs%2Fangularjs%2F1.2.25%2Fangular.min.js%3A18%3A170)
Usually I forget to include in the index html.
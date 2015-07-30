This is just the boiler plate.. I can make to other 

ng-view marker to load where the view will go in the page. 
Avoid all logic in the view. ng-init --> allow us to initialize some variables. 
ng-click to do something when it's clicked. 
ng-bind, if we like the scenario without the {{}} we can use the span:
<span ng-bind ="name"></span> is similar to {{name}}

ng-switch.. 
we can use controller to switch. 
ng-switch-on
ng-switch-when.. 
ng-class for styling the apps. 
you can duplicate the bracket inside the html model:
ex: <p> {{name}} {{power}} </p>

angular js prvide the filter functionality:
(build in filter.) it use the pipe character. 
there are many AngularJS Filters. 
currency
date
filter
json
limitTo
...
number
orderBy...

example
<ul>
	<li data-ng-repeat = "cust in costument | orderBy: name" </li>


this is really cool features:
example:
<input type= "text" data-ng-model="nameText"/>
<ul>
	<li data-ng-repeat="cust in customers | filter: nameText.name | orderBy: 'name'">
	{{cust.name}} - {{cust.city}} 
	...
	</ul>  


this will search through the list that match: 

      <input type="text" ng-model="nameText" />
      <ul>
        <li ng-repeat="weapon in weaponList | filter:nameText | orderBy: 'name'">
          {{weapon.name}} {{ weapon.power}} </li>
      <ul>
      <div ng-view>
      </div>

 that's really neat
 automatic formatted in the model:

 example: {{cust.name | currency:'<put-any-format-you-want>'}}
 		: {{cust.joined | date:'yyyy-MM-dd'}} --> we can lots of format.. wow.. this is really neat,
 we can change into any format
 we can also do the limit.. for example I want to limit:
         <li ng-repeat="weapon in weaponList | filter:nameText | orderBy: 'name' | limitTo: 2">
         this is to filter based on specific value: filter: nameText.name

another powerful example:
reverse in the index.html is just for descending or ascending order:
        <tr ng-repeat="weapon in weaponList | orderBy:sortBy:reverse">

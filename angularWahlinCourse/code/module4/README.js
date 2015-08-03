Using controller in a Directive
Replacing Link() with a controller
using controller as
adding a controller to table helper.
Passing parameter out of a Directive
Transclution

This is all about Data-Driven Directives

Transclution is inclusion of a document or part of a document into another document by reference. 
We are including the dynamic content

This is to make it unique by index:
         <div ng-repeat="task in tasks track by $index">

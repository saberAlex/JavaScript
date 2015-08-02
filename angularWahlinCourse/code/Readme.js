DDOs --> directives ?? object
$compile service
The link() function
pre Vs post link
The $interpolate
$parse and eval()
Transclusion
Isolate Scope
Using Controller

Prerequisite:
	Angular.js -- javascript -- HTML -- CSS

Course agenda:
1. Getting Started with directives
2. DDo --> directive definition object. 
3. Shared and Isolate Scope. (3 local scope properties)
4. The link function (All about all to tweak the DOM) --jQLite 
5. Using Controller with regard to custom directives! Transclusion 

(The Role of directives)
example of a directive: (which we can attached to the DOM element) --> we can teach html new tricks
<div my-directive></div>
there is a lot of directives: UI-Bootstrap , Angular Strap, angular Grip, angular translate

Write a custom directive!!!
Directive categories --> 
DOM-Driven directives
Data-Driven Directives
Behaviour-Driven-Directives (all about handling DOM events).
Directive Types
	(Most common)
	Attribute based: <span my-dir="exp"></span>
	Element directives (created our own tag) <my-dir></my-dir>
	CSS Class directives: ....
	Comment directives:...

Directive Building Box:

	$compile --> this is the engine of our directive
		DDO (Directive Definition Object); this tell the provider what the directives need
		Template and Scope: Template(html) <--merge--> Scope(data)
	The process: Template --> $compile --> Template Function + scope --> HTML
	DDO properties --> restrict, Template, TemplateURL, scope, Controller, and link
		link function is all about the dom!
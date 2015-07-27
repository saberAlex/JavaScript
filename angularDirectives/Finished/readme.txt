The next item we discuss here is a directives for angular JS
In the HTML element, it can contain some standardize web component like <div>,<p>, etc. However we can also create a custom web-component such as:
	<weapon-list><weapon-list>
Usually the browser will ignore what inside this tag, but in angular, we can access this using teh camel case convention. 

These are several ways to create directives in angular JS:
    <search-result></search-result>; using element
    <div search-result></div>; using atrribute
    <div class="search-result"></div>; using class
    <!-- directive: search-result -->; using comment. 


//DOM
//creating html DOM using javascript. 

var p = document.createElement('p'); //This to create: <p> test</p>
//attached to the body:
document.body.appendChild(p);
var textToAppend = document.createTextNode('Hello World');
p.appendChild(textToAppend);

//inject the element and id
p.id = "id01";
p.className = "class01";

var allP = document.getElementsByTagName("p");
allP[0].className="classModified";
//similarly we can also access via class, 
//we can channge the css:
allP[0].style.color = "firebrick";

//What is a document?
//Event handler and listener:
//this is to handle the interactivity:
// example:
// click
// doubleclick
// focus, hover is consider focus
// blur, is the opposite of focus
// mouse Down >> this is the event of click event
// mouse out
// mouse up
// keydown >> lauch when the key is pressed. 
// you can check in wiki about the DOM element. 

// The primary is event handler and event listener.
// something is done when we do something. 
// Event listener:

allP[0].addEventListener("click", ourFunction, false);
var ourFunction = function() {
	console.log("test");
}

// if parent first triggered = capturing 
// if child first = bubbling
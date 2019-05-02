// VARIABLE INITIALIZATION
var button = document.getElementById('enter');
var input = document.getElementById('userinput');
var ul = document.querySelector('ul');
var list = document.querySelectorAll('li');
var delbutton = document.getElementsByClassName('delete');
var frame = document.getElementById('frame');
var container = document.getElementsByClassName('container');
var colors = [container[0], container[1], container[2], container[3], container[4], container[5]];
var header = document.getElementsByTagName('div')[1];

// FUNCTIONS
function inputValue() {
	return input.value;
}

function addListAfterClick() {
	if( (inputValue() !=0 ) && (inputValue() != "&nbsp") ) {
	createListElement();
	}
}

function addListAfterKeypress(event) {
	if( (inputValue() !=0 ) && (inputValue() != "&nbsp") && (event.code == "Enter") ) {
	createListElement();
	}
}

// * -> Can be removed if the initial list on index.html is blank
function addDeleteButton() { 
	for (i=0; i<list.length; i++) {
		var remove = document.createElement("button");
		remove.textContent = "X";
		remove.classList.add("delete");
		list[i].appendChild(remove);
	}	
}
 // * -> It would be interesting to shorten the below function using addDeleteButton but I don't know how to do it!!!
function createListElement() {
	var li = document.createElement("li");
	li.textContent = input.value;
	var remove = document.createElement("button");
	remove.textContent = "X";
	remove.classList.add("delete");
	li.appendChild(remove);
	ul.appendChild(li);
	input.value="";
	list = document.querySelectorAll('li');
}


function changeSelectedItem() {
	for (j=0; j<list.length; j++) {
		list[j].addEventListener("click", changeStatus);
		delbutton[j].addEventListener("click", removeItem, true);
	}
}

function changeStatus() {
	this.classList.toggle("done");
}

function removeItem() {
	this.parentNode.parentNode.removeChild(this.parentNode);
	list = document.querySelectorAll('li');
}

function changeColor() {
	frame.style.backgroundColor = this.style.backgroundColor; 
}

// function listenButtons() {
// 	colors.forEach(item => {
// 		item.addEventListener("click", changeColor);
// 	})
// }

function changeBackgroundColor() {
	for (k=0; k < colors.length-1; k++) {
		colors[k].addEventListener('click', changeColor);
	}
}

// FUNCTION CALL
addDeleteButton(); // * -> Can be removed if the initial list on index.html is blank
button.addEventListener("click", addListAfterClick);
input.addEventListener("keydown", addListAfterKeypress);
ul.addEventListener("mousedown", changeSelectedItem);
header.addEventListener("mousedown", changeBackgroundColor)
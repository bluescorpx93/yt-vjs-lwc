var addButtonElem = document.getElementById('myAddBtn');
var showButtonElem = document.getElementById('myShowBtn');
var headingElem = document.getElementById('myh1');
var ulElem = document.getElementById('myUL');
var listItemsElem = ulElem.getElementsByTagName("li");
var inputElem = document.getElementById('myInput');
var resultsElem = document.getElementById('myResults'); 
var deleteSpansElem = ulElem.getElementsByTagName("span");

document.addEventListener("DOMContentLoaded", function(event){
	for (var i=0; i< deleteSpansElem.length; i++){
		deleteSpansElem[i].setAttribute('id', i+1);
		deleteSpansElem[i].style.display='none';
	}
});

showButtonElem.addEventListener('click', showContent);
addButtonElem.addEventListener("click", addNewListItem);

function showContent(){

	for (var i=0; i< listItemsElem.length ; i++){
		listItemsElem[i].addEventListener("click", activateItem);
		deleteSpansElem[i].style.display='inline';
		deleteSpansElem[i].addEventListener("mouseover", styleListItem);
		deleteSpansElem[i].addEventListener("click", deleteItem);
	}
	
	resultsElem.innerHTML = "UL Changed";
}

function activateItem(){
	headingElem.innerHTML = this.innerHTML;
	for (var i=0; i<listItemsElem.length; i++){
		listItemsElem[i].style.background = "white"
	}
	this.style.background = "beige";
}

function styleListItem(){
	this.style.cursor = "pointer";
}

function addNewListItem(){
	if (!inputElem.value) { 
		resultsElem.innerHTML = "Pls Type something"
	} else {
		showContent();
		ulElem.innerHTML +=`<li>${inputElem.value} <span id=${listItemsElem.length+1}> X </span> </li>`
		showContent()
	}
}

function deleteItem(e){
	listItemsElem[e.target.id].style.display = "none";
	showContent()
	//console.log(e.target.id);
}


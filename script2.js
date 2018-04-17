var heading = document.getElementsByTagName('h1');
var loadBtn = document.getElementById('fetchBtn');
var infoDiv = document.getElementById('infoDiv');

var showItems = 0;

heading[0].style.fontFamily = "Sans";

loadBtn.addEventListener("click", function(){
  var request = new XMLHttpRequest();
  const APIURL = 'https://randomapi.com/api/e6ac05b947fd4f5eab6de20326b912ee';

  request.open('GET', APIURL);
  request.onload = function(){
		if (request.status >=200 && request.status <400){
			var dataFromServer = JSON.parse(request.responseText);
	  	var arrData = dataFromServer.results[0].shoppingItems;
	  	renderHTML(arrData);	
		} else {
			console.log("Server Err");
		}
  }

  request.onerror = function(){
  	console.log("Connection Err")
  }
  request.send();
});



function renderHTML(data){
  var divContent = "";
  var vitaminStr = "";

  if (data[showItems]){
	  for (var i=0; i<3; i++){
  		if (data[showItems]){
  			for (var j=0; j< data[showItems].vitamins.length; j++){ 
  				vitaminStr += (data[showItems].vitamins[j] + ", ");
  			}

  			divContent += `
  										<div> 
  											<h3> ${data[showItems].name} </h3>
  											<p> Recipe: <strong> ${data[showItems].recipe.name} </strong>, Prep Time: <strong> ${data[showItems].recipe.prepTime}</strong>, Total Calories: <strong> ${data[showItems].recipe.calories}</strong> </p>
  											<table> 
  												<thead> 
  													<tr> 
  														<th> Weight</th>
  														<th> Price</th>
  														<th> Color</th>
  														<th> Vitamins</th>
  													</tr> 
  												</thead> 
  												<tbody> 
  													<tr> 
  														<td> ${data[showItems].weight}</td>
  														<td> ${data[showItems].price}</td>
  														<td> ${data[showItems].color}</td>
  														<td> ${vitaminStr} </td>
  													</tr> 
  												<tbody> 
  											</table>
  										</div>
  										`;
  			showItems ++;
  		} else {
				var newElem = document.createElement("h4");
				var textNode = document.createTextNode('Reached All Concent');
				newElem.appendChild(textNode);
				infoDiv.prepend(newElem);
				loadBtn.disabled = true;
				return;
		 	}
  	}
  	infoDiv.insertAdjacentHTML('beforeend', divContent);		
  }	
}


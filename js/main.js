// Project: VFW Project 2
// Name: Brent Marohnic
// Term: 1207
// Date: 2012-07-12

window.addEventListener("DOMContentLoaded", function(){
	
	function getIt(x){
		var whichElement = document.getElementById(x);
		return whichElement;
	}
	
	function getItByName(x){
		var whichElement = document.getElementsByName(x);
		for (var i=0, j=whichElement.length; i<j; i++){
			if (whichElement[i].checked) {
				return whichElement[i];
			}
		}
		
	}
	
	function getItCB(x){
		var whichElement = document.getElementById(x);
		if (whichElement.checked){
			return "Yes";
		} else {
			return "No";
		}
	}
	
	var makesArray = ["Select Manufacturer", "Manufacturer", "Acura", 
					  "Audi", "BMW","Chevy", "Chrysler", "Dodge", 
					  "Ford", "Honda", "Hyundai", "Infinity", 
					  "Jeep", "Kia", "Lexus", "Lincoln", "Mercedes", 
					  "Nissan", "Toyota"],
		errMsg = getIt('errors');
					  
	//populate values for the select element
	
	function createMakesSelect (){
	//	var formTag = document.getElementsByTagName("form"),
		var	selectLi = getIt('carMake'),
			makesSelect = document.createElement('select');
			//go ahead and give it an id in case I need to target it later
			makesSelect.setAttribute("id","allMakes");
			//create the optgroup portion of the select element here
			var makesLabel = document.createElement('optgroup');
			//go ahead and give it an id in case I need to target it later
			makesLabel.setAttribute("id","makesOptGroup");
			//set the value of the label to the first value in the array
			makesLabel.setAttribute("label", makesArray[0]);
			//make the opt group text the selected text in the drop down
			makesLabel.setAttribute("selected", "selected");
			//make sure to set i to 1 so that the label is not inserted twice
			for (var i = 1, j = makesArray.length; i < j; i++) {
				
				var makeMakes = document.createElement('option');
					
				makeMakes.setAttribute("value", makesArray[i]);
				makeMakes.innerHTML = makesArray[i];
				makesLabel.appendChild(makeMakes);
				
			}
			makesSelect.appendChild(makesLabel);
			selectLi.appendChild(makesSelect);
	}
	
	createMakesSelect();
	
	function changeDisplay(x) {
		switch(x) {
			case 1:
				getIt('bigForm').style.display = "none";
				getIt('clearAll').style.display = "inline";
				getIt('displayData').style.display = "none";
				getIt('addNew').style.display = "inline";
				break;
			
			case 0:
				getIt('bigForm').style.display = "block";
				getIt('clearAll').style.display = "inline";
				getIt('displayData').style.display = "inline";
				getIt('addNew').style.display = "none";
				getIt('items').style.display = "none";
				break;
				
			default:
				return false;
		}	
	}
	
	
	function storeData(key){
		
	//	formValidate();
		if (!key){
			var id = localStorage.length;
		}
		else {
			id = key;
		}
		var carStuff = {};
			carStuff.owner = ["Owner:", getIt('owner').value];
			carStuff.make = ["Make:", getIt('allMakes').value];
			carStuff.model = ["Model:", getIt('carModel').value];
			carStuff.mileage = ["Mileage:", getIt('carMileage').value];
			carStuff.transmission = ["Transmission:", getItByName('transmission').value];
			carStuff.condition = ["Condition:", getIt('carCondition').value];
			carStuff.email = ["Owner's Email:", getIt('email').value];
			carStuff.url = ["Favorite Website:", getIt('url').value];
			carStuff.oilCB = ["Oil and Filter:", getItCB('oilAndFilter')];
			carStuff.tireRotationCB = ["Tire Rotation:", getItCB('tireRotation')];
			carStuff.airFilterCB = ["Air Filter:", getItCB('airFilter')];
			carStuff.cabinFilterCB = ["Cabin Filter:", getItCB('cabinFilter')];
			carStuff.sparkPlugsCB = ["Spark Plugs:", getItCB('sparkPlugs')];
			carStuff.brakePadsCB = ["Brake Pads:", getItCB('brakePads')];
			carStuff.sBeltCB = ["Serpentine Belt:", getItCB('sBelt')];
			carStuff.tBeltCB = ["Timing Belt:", getItCB('tBelt')];
			carStuff.oilChange = ["Last Oil Change:", getIt('lastOilChange').value];
			carStuff.airChange = ["Last Air Filter Change:", getIt('lastAirChange').value];
			carStuff.handy = ["Do-it-yourselfer?:", getItByName('handy').value];
			carStuff.provider = ["Service Provider:", getIt('shops').value];
			carStuff.notes = ["Notes:", getIt('comments').value];
		
		localStorage.setItem(id, JSON.stringify(carStuff));
		alert("Vehicle Saved!");
		
	}
	
	function displayData(){
		if (localStorage.length === 0) {
			alert("There is no data to display!");
			
		}
		changeDisplay(1);
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		getIt('items').style.display = "block";
		
		for (var i=0, j=localStorage.length; i<j; i++) {
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var n in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create the edit and delete links for items in local storage.
		}
	}
	
	// Create the edit and delete links for the items in local storage whenever they are displayed.
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = '#';
		editLink.key = key;
		var editText = "Edit Vehicle";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var spaceLink = document.createElement('a');
		spaceLink.href = '#';
		spaceLink.style.visibility = 'hidden';
		var spaceText = "xxxxx";
		spaceLink.innerHTML = spaceText;
		linksLi.appendChild(spaceLink);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = '#';
		deleteLink.key = key;
		var deleteText = "Delete Vehicle";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var carStuff = JSON.parse(value);
		alert(this.key);
		changeDisplay(0);
		
		getIt('owner').value = carStuff.owner[1];
		getIt('allMakes').value = carStuff.make[1];
		getIt('carModel').value = carStuff.model[1];
		getIt('carMileage').value = carStuff.mileage[1];
		var trans = document.forms[0].transmission;
		alert(carStuff.transmission[1]);
		if (carStuff.transmission[1] == 'Automatic') {
			trans[0].setAttribute("checked", "checked");
		}
		else {
			trans[1].setAttribute("checked", "checked");
		}
		/*
		getIt('carCondition').value
		getIt('email').value
		getIt('url').value
		getItCB('oilAndFilter')
		getItCB('tireRotation')
		getItCB('airFilter')
		getItCB('cabinFilter')
		getItCB('sparkPlugs')
		getItCB('brakePads')
		getItCB('sBelt')
		getItCB('tBelt')
		getIt('lastOilChange').value
		getIt('lastAirChange').value
		getItByName('handy')
		getIt('shops').value
		getIt('comments').value
		*/
		
		//Remove initial listener 
		save.removeEventListener("click", storeData);
		//Change the submit button value to say edit button
		getIt('saveIt').value = "Edit Vehicle";
		var editSubmit = getIt('saveIt');
		//save the key value so we can use it when we save the edited data
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	} 
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this vehicle?");
		if (ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}
		else {
			alert("The vehicle was not deleted.");
			window.location.reload();
		}
	}
	
	
	function clearStoredData(){
		if (localStorage.length === 0) {
			alert("No stored data to clear!");
			changeDisplay(0);
		} else {
			localStorage.clear();
			alert("All verhicle information has been deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(eventData){
		var getOwner = getIt('owner'),
			getMake = getIt('allMakes'),
			getModel = getIt('carModel'),
			getMileage = getIt('carMileage');
		
			
		var messageArray = [];
			errMsg.innerHTML ="";
			
			
		getOwner.style.border = "1px solid black";
		getMake.style.border = "1px solid black";
		getModel.style.border = "1px solid black";
		getMileage.style.border = "1px solid black";
		
		if(getOwner.value == '') {
			var ownerError = "Please enter your name.";
			getOwner.style.border = "1px solid red";
			messageArray.push(ownerError);
		}
		
		if(getMake.value == 'Manufacturer') {
			var makeError = "Please choose a vehicle manufacturer.";
			getMake.style.border = "1px solid red";
			messageArray.push(makeError);
		}
		
		if(getModel.value == '') {
			var modelError = "Please choose a vehicle model.";
			getModel.style.border = "1px solid red";
			messageArray.push(modelError);
		}
		
		if(getMileage.value == '') {
			var mileageError = "Please enter vehicle mileage.";
			getMileage.style.border = "1px solid red";
			messageArray.push(mileageError);
		}
		
		if (messageArray.length >= 1) {
			for( var i = 0, j = messageArray.length; i < j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
				
			}
			eventData.preventDefault();
			return false;
		}
		else {
			storeData(this.key);
		}
	}
	
	
/*	
	function formValidate(){
		for (var i = 0, j = 5, k=getIt(bigForm) ; i<j; i++ ) {
			if (k[0].id) {
				alert(k[0].id);
			}
		}
		
	}
*/	
	var save = getIt('saveIt');
	save.addEventListener('click', validate);
	
	var clearAll = getIt('clearAll');
	clearAll.addEventListener('click', clearStoredData);
	
	var displayIt = getIt('displayData');
	displayIt.addEventListener('click', displayData);
})


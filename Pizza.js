$(document).ready(function() {

function PizzaViewModel() {
	var self = this;
	self.locationName = ko.observable();
	self.pizzaTypes = ko.observableArray([]);
	self.infoMessage = ko.observable();
	self.selectedPizzaType = ko.observable();
	self.selectedToppings = ko.observableArray();

	function initialize(){
	  var mapOptions = {
	    center: new google.maps.LatLng(37.0902,-95.7129),
	    zoom: 4,
	    disableDefaultUI: true,
	  };
	  var map = new google.maps.Map(document.getElementById("UsMap"), mapOptions);
	  mapLocations(map);
	  QUnit.config.autostart = false;
	  $("#toppings").addClass("Hidden");
	  $("#toppingsHeader").addClass("Hidden");
	  self.infoMessage("Please choose your location.");
	}

	google.maps.event.addDomListener(window, "load", initialize);

	function mapLocations(map){

		var sfLatLng = new google.maps.LatLng(37.68382,-122.431641);
		var chicagoLatLng = new google.maps.LatLng(41.857288,-87.637939);
		var nyLatLng = new google.maps.LatLng(40.706148,-74.012489);

		var sanFrancisco = createMarker(map, "San Francisco", sfLatLng);
		var chicago = createMarker(map, "Chicago", chicagoLatLng);
		var newYork = createMarker(map, "New York", nyLatLng);
	}

	function setLocation(locationName){
		$("#SelectPizza").removeClass("Hidden");
		self.locationName(locationName);
		setPizzaTypes();
	}

	function createMarker(map, title, positionLatLng){
		var marker = new google.maps.Marker({
			map: map,
			title: title,
			position: positionLatLng,
		});
		google.maps.event.addListener(marker, 'click', function() {
			setLocation(marker.title);
		});
		return marker;
	}

	function setPizzaTypes(){
		self.pizzaTypes.removeAll();
		self.selectedToppings.removeAll();

		self.infoMessage("Now choose your pizza to view the toppings.");

		if(self.locationName() == 'San Francisco') {
			self.pizzaTypes.push({"pizzaType": "cheese", "pizzaName": "SanFranCheese", "defaultToppings": "Just cheese"});
			self.pizzaTypes.push({"pizzaType": "veggie", "pizzaName": "SanFranVeggie", "defaultToppings": "Mushrooms"});
			self.pizzaTypes.push({"pizzaType": "pepperoni", "pizzaName": "SanFranMeatLovers", "defaultToppings": "Pepperoni"});
		}
		if(self.locationName() == 'Chicago') {
			self.pizzaTypes.push({"pizzaType": "cheese", "pizzaName": "C-Cheese", "defaultToppings": "Just cheese"});
			self.pizzaTypes.push({"pizzaType": "veggie", "pizzaName": "C-Veggie", "defaultToppings": "Mushrooms"});
			self.pizzaTypes.push({"pizzaType": "pepperoni", "pizzaName": "C-MeatLovers", "defaultToppings": "Pepperoni"});
		}
		if(self.locationName() == 'New York') {
			self.pizzaTypes.push({"pizzaType": "cheese", "pizzaName": "NY-Cheese", "defaultToppings": "Just cheese"});
			self.pizzaTypes.push({"pizzaType": "veggie", "pizzaName": "NY-Veggie", "defaultToppings": "Mushrooms"});
			self.pizzaTypes.push({"pizzaType": "pepperoni", "pizzaName": "NY-MeatLovers", "defaultToppings": "Pepperoni"});
		}
	}

	self.displayToppings = function(pizzaTypeSelected) {
		self.selectedPizzaType(pizzaTypeSelected.pizzaName);
		self.selectedToppings.removeAll();
		self.infoMessage("Hurray! now you can check the default toppings for the pizza. Feel free to change any of your selections before you confirm your order.");

		self.selectedToppings.push(pizzaTypeSelected.defaultToppings);
	    $("#toppings").removeClass("Hidden");
	    $("#toppingsHeader").removeClass("Hidden");
	}

}
ko.applyBindings(new PizzaViewModel());
});
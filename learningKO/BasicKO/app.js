function AppViewModel() {
	this.firstName = ko.observable("Alex");
	this.lastName = ko.observable("Lumierre");
	this.fullName = ko.computed(function() {
	    return this.firstName() + " " + this.lastName();    
	}, this);
	this.capitalizeLastName = function() {
	      var currentVal = this.lastName();        // Read the current value
	      this.lastName(currentVal.toUpperCase()); // Write back a modified value
	};
}

ko.applyBindings(new AppViewModel(), document.getElementById("bind01"));

// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function() {
    	var price = self.meal().price;
    	return price ? "$" + price.toFixed(2): "None";
    })
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;
    self.newName = ko.observable();

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.953543 },
        { mealName: "Ultimate (whole zebra)", price: 290.5653341 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[2])
    ]);

    self.addSeat = function() {
    	var name = self.newName(); //we need to invoke the function so it will return the string; otherwise it will return entire object which is Really bad because Javascript object is passed by reference
    	self.seats.push(new SeatReservation(name, self.availableMeals[0]));
    	self.name="";
    };

    self.removeSeat = function(seat) { self.seats.remove(seat) };
    self.totalSurcharge = ko.computed( function() {
    	var total = 0;
    	for( var i = 0; i < self.seats().length; i++) {
    		total += self.seats()[i].meal().price;
    	}
    	return total;
    })

}

ko.applyBindings(new ReservationsViewModel(),  document.getElementById("bind02"));


var ViewLocation = function(dict) {
	var UI = require("/lib/UI/UI");

	var PLACE_LATITUDE = -30.0228728;
	var PLACE_LONGITUDE = -51.1621618;
	var PLACE_ADDRESS = "Av. Túlio de Rose, 80 - Passo da Areia";

	var annotation = UI.createAnnotation({
		latitude: PLACE_LATITUDE,
		longitude: PLACE_LONGITUDE,
		rightButton: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
		subtitle: PLACE_ADDRESS,
		title: "Bourbon Country"
	});

	var self = UI.createMapView({
		annotations: [annotation],
		region: {
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
			latitude: PLACE_LATITUDE,
			longitude: PLACE_LONGITUDE
		}
	});

	self.addEventListener("click", function(e) {
		if (typeof e.annotation !== "undefined" && e.clicksource === "rightButton") {
			var TiRoute = require("/lib/TiRoute/TiRoute");
			TiRoute.route(PLACE_LATITUDE, PLACE_LONGITUDE, PLACE_ADDRESS);
		}
	});

	dict.mainWindow.addEventListener("focus", function() {
		self.selectAnnotation(annotation);
	});

	return self;
};

module.exports = ViewLocation;
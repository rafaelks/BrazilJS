var isAndroid = (Ti.Platform.osname === "androi");

exports.route = function(latitude, longitude, address) {
	var optionsTitles = [];
	var optionsSchemes = [];
	var optionsTags = [];
	var defaultScheme;

	if (!isAndroid) {
		if (parseFloat(Ti.Platform.version) >= 6) {
			defaultScheme = "http://maps.apple.com/maps?z=0.005&daddr=" + latitude + "," + longitude;
		} else {
			defaultScheme = "http://maps.google.com/maps?z=0.005&daddr=" + latitude + "," + longitude;
		}
	} else {
		defaultScheme = "http://maps.google.com/maps?z=0.005&daddr=" + address;
	}

	var tomtomScheme = "tomtomhome:geo:action=show&lat=" + latitude + "&long=" + longitude;
	var wazeScheme = "waze://?ll=" + latitude + "," + longitude + "&navigate=yes";
	var googleMapsScheme = "comgooglemaps://?daddr=" + address + 
			"&center=" + latitude + "," + longitude + "&zoom=10";

	if (isAndroid) {
		Ti.Platform.openURL(defaultScheme);
	} else {
		if (Ti.Platform.canOpenURL(tomtomScheme)) {
			optionsTitles.push("TomTom");
			optionsTags.push("TomTom");
			optionsSchemes.push(tomtomScheme);
		}

		if (Ti.Platform.canOpenURL(wazeScheme)) {
			optionsTitles.push("Waze");
			optionsTags.push("Waze");
			optionsSchemes.push(wazeScheme);
		}

		if (Ti.Platform.canOpenURL(googleMapsScheme)) {
			optionsTitles.push("Google Maps");
			optionsTags.push("Google Maps");
			optionsSchemes.push(googleMapsScheme);
		}

		if (Ti.Platform.canOpenURL(defaultScheme)) {
			optionsTitles.push(L("maps"));
			optionsTags.push("Maps");
			optionsSchemes.push(defaultScheme);
		}

		if (optionsTitles.length > 1) {
			optionsTitles.push(L("cancel"));

			var routeOptionsDialog = Ti.UI.createOptionDialog({
				title: L("choice_route_app"),
				options: optionsTitles,
				cancel: optionsTitles.length - 1,
			});

			routeOptionsDialog.show();

			routeOptionsDialog.addEventListener("click", function(e) {
				if (e.index === optionsTitles.length - 1) return;
				scheme = optionsSchemes[e.index];
				Ti.Platform.openURL(scheme);
			});
		} else {
			var alertGoMaps = Ti.UI.createAlertDialog({
				title: L("ask_open_maps_title"),
				message: L("ask_open_maps_message"),
				buttonNames: [L("cancel"), L("yes")]
			});
			alertGoMaps.show();
			alertGoMaps.addEventListener("click", function(e) {
				if (e.index === 1) {
					Ti.Platform.openURL(defaultScheme);
				}
			});
		}
	}
};
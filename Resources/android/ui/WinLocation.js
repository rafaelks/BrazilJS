var WinLocation = function() {
	var UI = require("/lib/UI/UI");
	var P = require("/lib/Platform");
	var ViewLocation = require("/ui/ViewLocation");

	var self = UI.createWindow({
		actionBarBackButton: true,
		navBarHidden: false,
		title: L("location")
	});

	var viewLocation = new ViewLocation({
		mainWindow: self
	});
	self.add(viewLocation);

	self.addEventListener("open", function() {
		var activity = this.getActivity();
		activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;

			var buttonRoute = menu.add({
				icon: (P.API_LEVEL < 11 ? Ti.Android.R.drawable.ic_menu_directions
 : "/images/ic_action_directions.png"),
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				title: L("directions")
			});

			buttonRoute.addEventListener("click", function() {
				viewLocation.fireEvent("makeRoute");
			});
		};

		// First time, invalidate options menu, to 
		// create menu buttons
		activity.invalidateOptionsMenu();
	});

	return self;
};

module.exports = WinLocation;

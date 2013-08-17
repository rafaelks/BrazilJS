var WinTalks = function() {
	var UI = require("/lib/UI/UI");
	var P = require("/lib/Platform");
	var ListViewTalks = require("/ui/ListViewTalks");

	var self = UI.createWindow({
		exitOnClose: true,
		navBarHidden: false,
		title: "BrazilJS"
	});

	var activityIndicator = Ti.UI.createActivityIndicator({
		style: Ti.UI.ActivityIndicatorStyle.BIG_DARK
	});
	activityIndicator.show();
	self.add(activityIndicator);

	var tableView = new ListViewTalks({
		mainWindow: self
	});
	self.add(tableView);

	self.addEventListener("dataLoaded", function() {
		activityIndicator.hide();
		self.remove(activityIndicator);
	});

	tableView.addEventListener("click", function(e) {
		if (e.row._hasChild) {
			var obj = e.row.obj;
			var WinTalk = require("/ui/WinTalk");
			new WinTalk({
				obj: obj
			}).open();
		}
	});

	self.addEventListener("open", function() {
		var activity = this.getActivity();
		activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;

			var buttonMap = menu.add({
				icon: (P.API_LEVEL < 11 ? Ti.Android.R.drawable.ic_menu_mapmode
 : "/images/ic_action_map.png"),
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				title: L("map")
			});

			buttonMap.addEventListener("click", function() {
				var WinLocation = require("/ui/WinLocation");
				new WinLocation().open();
			});

			var buttonInfo = menu.add({
				icon: (P.API_LEVEL < 11 ? Ti.Android.R.drawable.ic_menu_info_details : "/images/ic_action_info.png"),
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				title: L("about")
			});

			buttonInfo.addEventListener("click", function() {
				var WinAbout = require("/ui/WinAbout");
				new WinAbout().open();
			});
		};

		// First time, invalidate options menu, to 
		// create menu buttons
		activity.invalidateOptionsMenu();
	});

	return self;
};

module.exports = WinTalks;

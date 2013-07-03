var ApplicationWindow = function() {
	var UI = require("/lib/UI/UI");

	var WinTalks = require("/ui/WinTalks");
	var WinLocation = require("/ui/WinLocation");

	var self = UI.createTabGroup({
		exitOnClose: true
	});

	var tabTalks = UI.createTab({
		icon: (P.API_LEVEL > 11) ? "/images/ic_action_talks.png" : "/images/ic_action_talks_white.png"
	});
	var winTalks = new WinTalks({ tab: tabTalks });
	tabTalks.setWindow(winTalks);
	self.addTab(tabTalks);

	var tabLocation = UI.createTab({
		icon: (P.API_LEVEL > 11) ? "/images/ic_action_location.png" : "/images/ic_action_location_white.png"
	});
	var winLocation = new WinLocation({ tab: tabLocation });
	tabLocation.setWindow(winLocation);
	self.addTab(tabLocation);

	return self;
};

module.exports = ApplicationWindow;

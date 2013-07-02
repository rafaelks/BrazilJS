var ApplicationWindow = function() {
	var UI = require("/lib/UI/UI");

	var WinTalks = require("/ui/WinTalks");
	var WinFavorites = require("/ui/WinFavorites");
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

	var tabFavorites = UI.createTab({
		icon: (P.API_LEVEL > 11) ? "/images/ic_action_favorites.png" : "/images/ic_action_favorites_white.png"
	});
	var winFavorites = new WinFavorites({ tab: tabFavorites });
	tabFavorites.setWindow(winFavorites);
	self.addTab(tabFavorites);

	var tabLocation = UI.createTab({
		icon: (P.API_LEVEL > 11) ? "/images/ic_action_location.png" : "/images/ic_action_location_white.png"
	});
	var winLocation = new WinLocation({ tab: tabLocation });
	tabLocation.setWindow(winLocation);
	self.addTab(tabLocation);

	return self;
};

module.exports = ApplicationWindow;

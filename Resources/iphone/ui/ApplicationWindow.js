var ApplicationWindow = function() {
	var UI = require("/lib/UI/UI");

	var WinTalks = require("/ui/WinTalks");
	var WinLocation = require("/ui/WinLocation");

	var self = UI.createTabGroup({
		activeTabIconTint: "red"
	});

	var tabTalks = Ti.UI.createTab({
		icon: "/images/TabGroup-Talks.png",
		title: L("talks")
	});
	var winTalks = new WinTalks({ tab: tabTalks });
	tabTalks.setWindow(winTalks);
	self.addTab(tabTalks);

	var tabLocation = Ti.UI.createTab({
		icon: "/images/TabGroup-Location.png",
		title: L("location")
	});
	var winLocation = new WinLocation({ tab: tabLocation });
	tabLocation.setWindow(winLocation);
	self.addTab(tabLocation);

	// Push Notification
	Ti.Network.registerForPushNotifications({
		types: [
			Ti.Network.NOTIFICATION_TYPE_ALERT,
			Ti.Network.NOTIFICATION_TYPE_SOUND
		],
		success: function(e) {
			var deviceToken = e.deviceToken;
			var WSRequest;

			if (!Ti.App.Properties.hasProperty("push_registered")) {
				WSRequest = require("/lib/WS/WSRequest");
				WSRequest.registerPushToken(deviceToken, function() {
					Ti.App.Properties.setBool("push_registered", true);
				});
			}
		},
		callback: function(e) {
			// Show alert to user with message
			Ti.UI.createAlertDialog({
				title: "BrazilJS 2013",
				message: e.data.alert
			}).show();

			Ti.UI.iPhone.setAppBadge(0);
		},
		error: function(e) {
			Ti.UI.createAlertDialog({
				title: "BrazilJS 2013",
				message: e.error
			}).show();
		}
	});

	return self;
};

module.exports = ApplicationWindow;

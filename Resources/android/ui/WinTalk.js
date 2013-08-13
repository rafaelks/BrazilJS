var WinTalk = function(dict) {
	var UI = require("/lib/UI/UI");
	var P = require("/lib/Platform");
	var HeaderViewTalk = require("/ui/HeaderViewTalk");
	var i18n = require("/lib/i18n/Remote");
	var tab = dict.tab;
	var obj = dict.obj || {};
	var rows = [];

	var self = UI.createWindow({
		actionBarBackButton: true,
		navBarHidden: false,
		title: L("talk")
	});

	obj.speaker.forEach(function(speaker) {
		var row = UI.createTableViewRow({
			type: "speaker",
			hasChild: true,
			height: Ti.UI.SIZE,
			obj: speaker
		});

		row.add( UI.createImageView({
			bottom: 5,
			image: "/images/" + speaker.image,
			height: 40,
			left: 10,
			top: 5,
			width: 40
		}) );

		row.add( UI.createLabel({
			font: { fontSize: 16 },
			height: Ti.UI.SIZE,
			left: 60,
			text: speaker.name
		}) );

		rows.push(row);
	});

	var description = i18n.getValue(obj.description);
	if (description.length) {
		var rowDescription = Ti.UI.createTableViewRow({
			height: Ti.UI.SIZE,
			selectedBackgroundColor: "#FFF"
		});

		rowDescription.add( UI.createLabel({
			bottom: 10,
			font: { fontSize: 16 },
			height: Ti.UI.SIZE,
			left: 10,
			right: 10,
			text: description,
			top: 10
		}) );

		rows.push(rowDescription);
	}

	var tableView = UI.createTableView({
		data: rows,
		headerView: new HeaderViewTalk({ obj: obj }),
		left: 10,
		right: 10,
		separatorColor: "#BEBEBE"
	});
	self.add(tableView);

	tableView.addEventListener("click", function(e) {
		if (e.row.type == "speaker") {
			var obj = e.row.obj;
			var WinSpeaker = require("/ui/WinSpeaker");
			new WinSpeaker({
				obj: obj
			}).open();
		}
	});

	self.addEventListener("open", function() {
		var activity = this.getActivity();
		activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;

			var buttonAddCalendar = menu.add({
				icon: (P.API_LEVEL < 11 ? Ti.Android.R.drawable.ic_menu_today
 : "/images/ic_action_add_calendar.png"),
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				title: L("add_calendar")
			});

			buttonAddCalendar.addEventListener("click", function() {
				var calendarId;
				var title = i18n.getValue(obj.name);
				var description = i18n.getValue(obj.description);

				var createEvent = function() {
					var calendar = Ti.Calendar.getCalendarById(calendarId);
					var eventCalendar = calendar.createEvent({
						title: title,
						notes: description,
						location: obj.place,
						begin: new Date(obj.startAt),
						end: new Date(obj.endAt)
					});

					eventCalendar.createReminder({
						minutes: 10,
						method: Ti.Calendar.METHOD_ALERT
					});

					Ti.UI.createAlertDialog({
						title: L("event_created"),
						message: L("calendar_created_event") + ": '" + title + "'",
						buttonNames: ["OK"]
					}).show();
				};

				if (Ti.App.Properties.hasProperty("defaultCalendar")) {
					calendarId = Ti.App.Properties.getInt("defaultCalendar");
					createEvent();
				} else {
					var optionsNames = [];
					var optionsIds = [];

					Ti.Calendar.selectableCalendars.forEach(function(calendar) {
						optionsNames.push(calendar.name);
						optionsIds.push(calendar.id);
					});

					if (optionsNames.length) {
						var optionDialog = Ti.UI.createOptionDialog({
							title: L("choice_calendar"),
							options: optionsNames
						});
						optionDialog.show();
						optionDialog.addEventListener("click", function(e) {
							if (e.index >= 0) {
								calendarId = optionsIds[e.index];
								Ti.App.Properties.setInt("defaultCalendar", calendarId);
								createEvent();
							}
						});
					} else {
						Ti.UI.createAlertDialog({
							buttonNames: ["OK"],
							message: L("no_calendars")
						});
					}
				}
			});

			var buttonShare = menu.add({
				icon: (P.API_LEVEL < 11 ? Ti.Android.R.drawable.ic_menu_share
 : "/images/ic_action_social_share.png"),
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				title: L("share")
			});

			buttonShare.addEventListener("click", function() {
				UIUtils.route(obj._id, latitude, longitude, obj.address);
			});
		};

		// First time, invalidate options menu, to 
		// create menu buttons
		activity.invalidateOptionsMenu();
	});

	return self;
};

module.exports = WinTalk;

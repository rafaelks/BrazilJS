var UI = require("/lib/UI/UI");
var P = require("/lib/Platform");
var TiSocial = require("dk.napp.social");
var currentSharingDict = null;

TiSocial.addEventListener("customActivity", function(e) {
	if (e.title === L("calendar")) {
		if (Ti.Calendar.eventsAuthorization === Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
			return addEventToCalendar(currentSharingDict);
		} else {
			return Ti.Calendar.requestEventsAuthorization(function(e) {
				if (e.success) {
					return addEventToCalendar(currentSharingDict);
				} else {
					return Ti.UI.createAlertDialog({
						title: L("calendar"),
						message: L("dont_allow_access_calendar"),
						buttonNames: [L("ok")]
					}).show();
				}
			});
		}
	}
});

var addEventToCalendar = function(dict) {
	var obj = dict.obj || {};
	var defaultCalendar = Ti.Calendar.getDefaultCalendar();

	var eventCalendar = defaultCalendar.createEvent({
		title: dict.title,
		notes: dict.description,
		location: dict.place,
		begin: new Date(dict.startAt),
		end: new Date(dict.endAt)
	});

	eventCalendar.alerts = [
		eventCalendar.createAlert({
			relativeOffset: -(60 * 15)
		})
	];

	eventCalendar.save();

	return Ti.UI.createAlertDialog({
		title: L("calendar"),
		message: L("calendar_created_event") + ": '" + dict.title + "'",
		buttonNames: [L("ok")]
	}).show();
};

exports.addEventToCalendar = addEventToCalendar;

var shareWithActivityView = function(dict) {
	return TiSocial.activityView({
		text: dict.message
	}, [
		{
			title: L("calendar"),
			type: "add.calendar",
			image: "/images/NHCalendarActivityIcon.png"
		}
	]);
};

var shareWithOptionDialog = function() {
	var TiSMS = require("bencoding.sms").createSMSDialog();
	var options = [];
	var dict = currentSharingDict;

	options.push(L("add_calendar"));

	if (TiSocial.isTwitterSupported()) {
		options.push(L("twitter"));
	}

	if (TiSocial.isFacebookSupported()) {
		options.push(L("facebook"));
	}

	options.push(L("email"));

	if (TiSMS.canSendText) {
		options.push(L("sms"));
	}

	options.push(L("cancel"));

	var optionDialogActions = Ti.UI.createOptionDialog({
		title: L("dialog_share_choices"),
		cancel: options.length - 1,
		options: options
	});

	optionDialogActions.show();

	return optionDialogActions.addEventListener("click", function(e) {
		switch (options[e.index]) {
			case L("twitter"):
				return TiSocial.twitter({
					text: dict.message
				});
			case L("facebook"):
				return TiSocial.facebook({
					text: dict.message
				});
			case L("add_calendar"):
				return addEventToCalendar(dict);
			case L("sms"):
				TiSMS.setMessageBody(dict.message);
				return TiSMS.open({
					animated: true
				});
			case L("email"):
				return Ti.UI.createEmailDialog({
					barColor: UI.BAR_COLOR,
					messageBody: dict.message
				}).open();
		}
	});
};

exports.share = function(dict) {
	currentSharingDict = dict;

	if (TiSocial.isActivityViewSupported()) {
		return shareWithActivityView(dict);
	} else {
		return shareWithOptionDialog(dict);
	}
};

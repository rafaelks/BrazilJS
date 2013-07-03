var TiSocial = require("dk.napp.social");
var Model = require("/lib/Model");
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
						buttonNames: [L("ok", "OK")]
					}).show();
				}
			});
		}
	}
});

var addEventToCalendar = function(dict) {
	var obj = dict.obj || {};
	var defaultCalendar = Ti.Calendar.getDefaultCalendar();

	if (typeof speech.speaker === "object" && speech.speaker.name.length > 0) {
		note = "" + (L("speaker")) + ": " + speech.speaker.name + "\n" + speech.description;
	} else {
		note = speech.description;
	}

	var eventCalendar = defaultCalendar.createEvent({
		title: speech.title,
		notes: note,
		location: speech.place_description,
		begin: new Date(speech.date_time_begin),
		end: new Date(speech.date_time_end)
	});

	eventCalendar.alerts = [
		eventCalendar.createAlert({
			relativeOffset: -(60 * 15)
		})
	];

	eventCalendar.save();

	return Ti.UI.createAlertDialog({
		title: L("calendar"),
		message: "" + (L('calendar_created_event')) + ": '" + speech.title + "'",
		buttonNames: [L("ok", "OK")]
	}).show();
};

var shareWithActivityView = function(dict) {
	return TiSocial.activityView({
		text: dict.message
	}, [
		{
			title: L("calendar"),
			type: "add.calendar",
			image: "/images/icons/NHCalendarActivityIcon.png"
		}
	]);
};

var shareWithOptionDialog = function() {
	var TiSMS = require("bencoding.sms").createSMSDialog();
	var options = [];

	if (TiSocial.isTwitterSupported()) {
		options.push(L("twitter"));
	}

	if (TiSocial.isFacebookSupported()) {
		options.push(L("facebook"));
	}

	options.push(L("add_calendar"));
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
				return addEventToCalendar();
			case L("sms"):
				TiSMS.setMessageBody(dict.message);
				return TiSMS.open({
					animated: true
				});
			case L("email"):
				return Ti.UI.createEmailDialog({
					barColor: theme.ios.barColor,
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

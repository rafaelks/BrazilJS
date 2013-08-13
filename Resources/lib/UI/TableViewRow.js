var UI = require("/lib/UI/UI");
var i18n = require("/lib/i18n/Remote");
var TiDate = require("/lib/TiDate/TiDate");
var P = require("/lib/Platform");


exports.talk = function(obj) {
	var hasSpeakers = (obj.speaker.length > 0);

	var self = UI.createTableViewRow({
		_hasChild: hasSpeakers,
		height: (hasSpeakers) ? Ti.UI.SIZE : 50,
		obj: obj
	});

	var viewLabels = UI.createView({
		layout: "vertical",
		left: 8,
		right: 65
	});
	self.add(viewLabels);

	if (!hasSpeakers) {
		self.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
		self.applyProperties({
			backgroundColor: '#f0f0f0'
		});
	} else {
		viewLabels.applyProperties({
			bottom: 10,
			top: 10
		});
	}

	// Talk title
	viewLabels.add( UI.createLabel({
		font: { fontSize: 16, fontWeight: "bold" },
		color: hasSpeakers ? '#000000' : '#666666',
		height: Ti.UI.SIZE,
		left: 2,
		text: i18n.getValue(obj.name)
	}) );

	var speakersName = obj.speaker.map(function(speaker) {
		return speaker.name
	});

	if (hasSpeakers) {
		viewLabels.add( UI.createLabel({
			color: "#666",
			font: { fontSize: 14 },
			height: Ti.UI.SIZE,
			left: 2,
			text: speakersName.join(" " + L("and") + " ")
		}) );

		if (!P.isAndroid) {
			self.add( Ti.UI.createImageView({
				height: 13,
				image: "/images/Arrow-Details.png",
				right: 8,
				width: 8
			}) );
		}
	}

	self.add( UI.createLabel({
		color: "#666",
		font: { fontSize: 12 },
		height: Ti.UI.SIZE,
		right: (P.isAndroid) ? 10 : 25,
		text: TiDate.getHours(obj.startAt),
		textAlign: "right"
	}) );

	return self;
};


exports.twitter = function(twitter) {
	var self = UI.createTableViewRow({
		twitter: twitter
	});

	self.add( UI.createLabel({
		font: { fontSize: 16, fontWeight: "bold" },
		left: 10,
		text: "@" + twitter,
		textAlign: "left"
	}) );

	return self;
};

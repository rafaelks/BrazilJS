var UI = require("/lib/UI/UI");
var i18n = require("/lib/i18n/Remote");
var TiDate = require("/lib/TiDate/TiDate");


exports.talk = function(obj) {
	var self = UI.createTableViewRow({
		className: "talk",
		hasChild: true,
		height: Ti.UI.SIZE,
		obj: obj
	});

	var viewLabels = UI.createView({
		bottom: 10,
		layout: "vertical",
		left: 8,
		top: 10
	});
	self.add(viewLabels);

	// Talk title
	viewLabels.add( UI.createLabel({
		font: { fontSize: 16, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		left: 2,
		text: i18n.getValue(obj.name),
		right: 45
	}) );

	var speakersName = obj.speaker.map(function(speaker) {
		return speaker.name
	});

	viewLabels.add( UI.createLabel({
		color: "#999",
		font: { fontSize: 14 },
		height: Ti.UI.SIZE,
		left: 2,
		text: speakersName.join(" " + L("and") + " "),
		right: 45
	}) );

	self.add( UI.createLabel({
		color: "#999",
		font: { fontSize: 12 },
		height: Ti.UI.SIZE,
		right: 5,
		text: TiDate.getHours(obj.startAt),
		textAlign: "right"
	}) );

	return self;
};


exports.developer = function(name, twitter) {
	var self = UI.createTableViewRow();

	self.add( UI.createLabel({
		left: 10,
		text: name,
		width: "47%"
	}) );

	self.add( UI.createLabel({
		right: 10,
		text: "@" + twitter,
		textAlign: "right",
		width: "47%"
	}) );

	return self;
};

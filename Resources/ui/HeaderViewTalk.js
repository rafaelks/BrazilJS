var HeaderViewTalk = function(dict) {
	var obj = dict.obj || {};

	var UI = require("/lib/UI/UI");
	var i18n = require("/lib/i18n/Remote");
	var TiDate = require("/lib/TiDate/TiDate");

	var self = UI.createView({
		height: Ti.UI.SIZE,
		layout: "vertical"
	});

	self.add( UI.createLabel({
		font: { fontSize: 18, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		left: 15,
		right: 15,
		text: i18n.getValue(obj.name),
		top: 20
	}) );

	self.add( UI.createLabel({
		color: "#666",
		font: { fontSize: 15 },
		height: Ti.UI.SIZE,
		left: 15,
		right: 15,
		text: TiDate.getDateFormatted(obj.startAt) + " - " + TiDate.getHours(obj.startAt),
		top: 20
	}) );

	return self;
};

module.exports = HeaderViewTalk;
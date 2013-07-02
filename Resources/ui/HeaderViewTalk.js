var HeaderViewTalk = function(dict) {
	var obj = dict.obj || {};

	var UI = require("/lib/UI/UI");
	var i18n = require("/lib/i18n/Remote");

	var self = UI.createView({
		height: Ti.UI.SIZE
	});

	self.add( UI.createLabel({
		font: { fontSize: 18, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		left: 15,
		right: 15,
		text: i18n.getValue(obj.name),
		top: 20
	}) );

	return self;
};

module.exports = HeaderViewTalk;
var UI = require("/lib/UI/UI");
var i18n = require("/lib/i18n/Remote");


exports.talk = function(obj) {
	var self = UI.createTableViewRow({
		className: "talk",
		hasChild: true,
		height: Ti.UI.SIZE
	});

	var viewLabelsWrapper = UI.createView({
		height: Ti.UI.SIZE,
		layout: "vertical",
		left: 10,
		right: 50,
		top: 10,
		bottom: 10
	});
	self.add(viewLabelsWrapper);

	// Talk title
	viewLabelsWrapper.add( UI.createLabel({
		font: { fontSize: 16, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		left: 0,
		text: i18n.getValue(obj.name)
	}) );

	// Speaker name
	viewLabelsWrapper.add( UI.createLabel({
		color: "#999",
		font: { fontSize: 14 },
		left: 0,
		text: obj.speaker.name
	}) );

	self.add( UI.createLabel({
		color: "#999",
		font: { fontSize: 14 },
		height: Ti.UI.SIZE,
		right: 10,
		text: "09:00"
	}) );

	return self;
};
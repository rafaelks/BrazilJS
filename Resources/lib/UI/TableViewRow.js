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
		right: 10,
		top: 10,
		bottom: 10
	});
	self.add(viewLabelsWrapper);

	// Talk title
	viewLabelsWrapper.add( UI.createLabel({
		text: i18n.getValue(obj.name)
	}) );

	return self;
};
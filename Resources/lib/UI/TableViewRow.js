var UI = require("/lib/UI/UI");


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
		text: obj.name
	}) );

	return self;
};
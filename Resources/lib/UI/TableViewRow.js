var UI = require("/lib/UI/UI");
var i18n = require("/lib/i18n/Remote");


exports.talk = function(obj) {
	var self = UI.createTableViewRow({
		className: "talk",
		hasChild: true,
		height: Ti.UI.SIZE,
		obj: obj
	});

	self.add( UI.createImageView({
		bottom: 8,
		height: 50,
		image: obj.image,
		left: 8,
		top: 8,
		width: 50
	}) );

	// Talk title
	self.add( UI.createLabel({
		font: { fontSize: 16, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		left: 66,
		text: i18n.getValue(obj.name),
		right: 45
	}) );

	self.add( UI.createLabel({
		color: "#999",
		font: { fontSize: 12 },
		height: Ti.UI.SIZE,
		right: 5,
		text: "09:00",
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

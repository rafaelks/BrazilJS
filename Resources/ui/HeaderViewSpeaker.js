var HeaderViewTalk = function(dict) {
	var obj = dict.obj || {};

	var UI = require("/lib/UI/UI");

	var self = UI.createView({
		height: Ti.UI.SIZE
	});

	self.add( UI.createImageView({
		image: "/images/" + obj.image,
		height: 100,
		top: 10,
		width: 100
	}) );

	self.add( UI.createLabel({
		font: { fontSize: 18, fontWeight: "100" },
		height: Ti.UI.SIZE,
		text: obj.name,
		top: 120
	}) );

	return self;
};

module.exports = HeaderViewTalk;
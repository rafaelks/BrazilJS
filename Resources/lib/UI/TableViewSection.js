var UI = require("/lib/UI/UI");


exports.talks = function(date) {
	var headerView = UI.createView({
		backgroundColor: "#B4B4B4",
		height: 30,
		opacity: 0.9
	});

	headerView.add( UI.createView({
		backgroundColor: "#A4A4A4",
		top: 0,
		height: 1,
		width: Ti.UI.FILL
	}) );

	headerView.add( UI.createLabel({
		color: "#000",
		font: { fontSize: 18, fontWeight: "bold" },
		left: 10,
		shadowColor: "#FFF",
		shadowOffset: { x: 0, y: 1},
		text: date
	}) );

	headerView.add( UI.createView({
		backgroundColor: "#A4A4A4",
		bottom: 0,
		height: 1,
		width: Ti.UI.FILL
	}) );

	return UI.createTableViewSection({
		headerView: headerView
	});
};

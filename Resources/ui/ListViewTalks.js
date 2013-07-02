var ListViewTalks = function(dict) {
	var UI = require("/lib/UI/UI");
	var RowTalk = require("/lib/UI/TableViewRow").talk;
	var WSRequest = require("/lib/WS/WSRequest");

	var rows = [];
	var self = UI.createTableView();

	dict.mainWindow.addEventListener("open", function() {
		// WSRequest.getTalks(function(data) {
		// 	data.forEach(function(talk) {
		// 		rows.push( new RowTalk(talk) );
		// 	});
		// 	self.setData(rows);
		// });

		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Douglas.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Alexandre.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Angus.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Caridy.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Demian.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Jean.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Josh.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Marcel.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Renato.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Rey.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Robert.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Stoyan.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Thibault.png" }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Zeno.png" }) );
		self.setData(rows);
	});

	return self;
};

module.exports = ListViewTalks;
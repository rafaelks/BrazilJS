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

		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Douglas.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Alexandre.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Angus.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Caridy.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Demian.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Jean.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Josh.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Marcel.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Renato.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Rey.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Robert.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Stoyan.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Thibault.png", speaker: [{ name: "Foobar" }] }) );
		rows.push( new RowTalk({ name: { pt: "Lorem ipsum Eu laborum dolore enim." }, image: "/images/Zeno.png", speaker: [{ name: "Foobar" }] }) );
		self.setData(rows);
	});

	return self;
};

module.exports = ListViewTalks;
var months = [
	L("january"),
	L("february"),
	L("march"),
	L("april"),
	L("may"),
	L("juny"),
	L("july"),
	L("august"),
	L("september"),
	L("october"),
	L("november"),
	L("december")
];

var of = " " + L("of") + " ";


var formatNumber = function(number) {
	if (number < 10) return "0" + number;
	return number;
};


exports.getHours = function(date) {
	var d = new Date(date);
	return formatNumber(d.getHours()) + ":" + formatNumber(d.getMinutes());
};


exports.getDateFormatted = function(date) {
	var d = new Date(date);
	return d.getDate() + of + months[d.getMonth()] + of + d.getFullYear();
}

exports.getDateFormattedWithoutYear = function(date) {
	var d = new Date(date);
	return d.getDate() + of + months[d.getMonth()];
}
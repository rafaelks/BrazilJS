var formatNumber = function(number) {
	if (number < 10) return "0" + number;
	return number;
};


exports.getHours = function(date) {
	var d = new Date(date);
	return formatNumber(d.getHours()) + ":" + formatNumber(d.getMinutes());
};
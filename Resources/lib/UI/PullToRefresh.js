var formatDate = function() {
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();

	var format = function(v) {
		return (v > 9) ? v : "0" + v;
	};

	return format(day) + "/" + format(month) + "/" + year + " " + format(hours) + ":" + format(minutes);
}

var PullToRefresh = function(tableView) {
	var that = this;
	this.pulling = false;
	this.reloaing = false;
	this.offset = 0;

	var self = Ti.UI.createView({
		backgroundColor: "#E4E4E4",
		height: 50
	});

	var arrowImage = Ti.UI.createImageView({
		image: "/images/Arrow-Pull.png",
		width: 17,
		height: 45,
		bottom: 10,
		left: 20
	});
	self.add( arrowImage );

	var labelsView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "vertical",
		bottom: 10
	});
	self.add( labelsView );

	var statusLabel = Ti.UI.createLabel({
		color: "#666666",
		font: { fontSize: 13, fontWeight: "bold" },
		height: Ti.UI.SIZE,
		text: L("pull_to_refresh"),
		textAlign: "center",
		top: 10,
	});
	labelsView.add( statusLabel );

	var lastUpdateLabel = Ti.UI.createLabel({
		color: "#666666",
		height: Ti.UI.SIZE,
		font: { fontSize: 12 },
		text: String.format(L("last_update"), formatDate()),
		textAlign: "center",
		top: 5
	});
	labelsView.add( lastUpdateLabel );

	var activityIndicator = Titanium.UI.createActivityIndicator({
		left: 20,
		style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		bottom: 20
	});
	self.add( activityIndicator );

	tableView.addEventListener("scroll", function(e) {
		that.offset = e.contentOffset.y;

		if (that.reloading === true) {
			return false;
		}

		var t = Ti.UI.create2DMatrix(),
			willRefresh = (that.offset <= -65.0 && !that.pulling),
			willNotRefresh = (that.pulling && that.offset > -65.0 && that.offset < 0);

		if (willRefresh) {
			that.pulling = true;
			statusLabel.setText(L("release_to_refresh"));
			t = t.rotate(-180);
			arrowImage.animate({ transform: t, duration: 180 });
		} else if (willNotRefresh) {
			that.pulling = false;
			statusLabel.setText(L("pull_to_refresh"));
			arrowImage.animate({ transform: t, duration: 180 });
		}
	});

	tableView.addEventListener("dragEnd", function(e) {
		if (that.pulling && !that.reloading && that.offset <= -65.0) {
			that.reloading = true;
			that.pulling = false;

			tableView.setContentInsets({ top: 60 },{ animated: true });
			tableView.fireEvent("reloadData");

			arrowImage.hide();
			arrowImage.transform = Ti.UI.create2DMatrix();

			activityIndicator.show();
			statusLabel.setText(L("loading"));
		}
	});

	tableView.addEventListener("loadDataCompleted", function() {
		that.reloading = false;

		tableView.setContentInsets({ top: 0 },{ animated: true });

		lastUpdateLabel.setText(String.format(L("last_update"), formatDate()));
		statusLabel.setText(L("pull_to_refresh"));

		activityIndicator.hide();
		arrowImage.show();
	})

	return self;
};

module.exports = PullToRefresh;
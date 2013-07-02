var PROTOCOL = "http://";
var HOST = "braziljs-ws.herokuapp.com/";
var API = "api/";
var URL =  HOST + API;
var TIMEOUT = 60000;

// HTTP request abstraction
var request = function(dict) {
	var dict = dict || {};
	var alertWhenOffline = (typeof dict.alertWhenOffline !== "undefined") ? dict.alertWhenOffline : true;

	if (!Ti.Network.online && alertWhenOffline) {
		Ti.UI.createAlertDialog({
			title: L("alert_no_network_title"),
			message: L("alert_no_network_message"),
			buttonNames: ["OK"]
		}).show();

		if (typeof dict.onerror === "function") {
			dict.onerror();
		}

		return;
	}

	var xhr = Ti.Network.createHTTPClient({
		timeout: TIMEOUT,
		onload: function() {
			Ti.API.info(this.responseText);
			var data;

			try {
				data = JSON.parse(this.responseText);
			} catch (e) {
				data = this.responseText;
			}

			if (typeof dict.onload === "function") {
				dict.onload({
					data: data,
					status: xhr.status,
					xhr: xhr
				}, false);
			}
		},
		onerror: function(e) {
			Ti.API.info(this.responseText);

			if (typeof dict.onerror === "function") {
				dict.onerror({
					data: this.responseText,
					status: xhr.status,
					xhr: xhr
				});
			}
		},
		oncancel: function() {
			Ti.API.info(this.responseText);

			if (typeof dict.oncancel === "function") {
				dict.oncancel(null, true);
			}
		}
	});

	// Construct Service URL
	var serviceURL = PROTOCOL + URL + dict.url;
	xhr.open(dict.type, serviceURL);

	// Basic HTTP informations
	xhr.setRequestHeader("Accept-Language", Ti.Locale.getCurrentLanguage());

	// Include some Platform informations
	xhr.setRequestHeader("X-Platform", Ti.Platform.osname);
	xhr.setRequestHeader("X-App-Version", Ti.App.version);

	if (dict.content === "json") {
		xhr.setRequestHeader("Content-Type", "application/json");
		dict.data = JSON.stringify(dict.data);
	}

	if (typeof dict.headers !== "undefined") {
		Ti.API.info( "HEADERS: ");
		dict.headers.forEach(function(header) {
			xhr.setRequestHeader(header.name, header.value);
			console.log(header.name, header.value);
		});
	}

	Ti.API.info("URL: " + serviceURL);
	Ti.API.info("TYPE: " + dict.type);
	Ti.API.info(dict.data);

	xhr.send(dict.data);
};

// This method is used to make a HTTP request
// without header information
exports._request = request;
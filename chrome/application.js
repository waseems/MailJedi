var application = {
	initialised: false,
	timer: null,

	init: function() {
		application.timer = setInterval('application.waitForInit();', 1500);		
	},
	attachApplicationSink: function() {
		var iconUrl = chrome.extension.getURL("images/icon11.png");		
		var sink = $("<span><a id='show-options'><img border='0' src='" + iconUrl + "' /></a></span>")
			.find('#show-options')
			.click(function() {
				chrome.windows.create({ 
					url: chrome.extension.getURL("options.html"), 
					width: 600, 
					height: 800, 
					type: 'popup' });			
			});		
		
		$(GUSER).children(':first')
			.prepend('<span> | </span>')
			.prepend(sink);
	},
	waitForInit: function() {
				
		if ($(GUSER).length) {		
			logger.log('Found gmail navigation bar');
			
			clearInterval(application.timer);
			application.attachApplicationSink();
		
			if ($(OFFLINE_INDICATOR).length) {
				logger.log('Found offline indicator');
				
				// Try to open gears database
				var db = google.gears.factory.create('beta.database');
				db.open('waseem@inbox2.com-GoogleMail@inbox2.com');
				var rs = db.execute('select count(*) from Messages');
				
				/*
				while (rs.isValidRow()) {
				  alert(rs.field(0));
				  rs.next();
				}
				*/
				db.close();
				
			} else {
				logger.log('No offline indicator found');				
			}
		}
	}
};

$(document).ready(function () {
	if (frameElement != null && frameElement.id == CANVAS_FRAME)
		application.init();		
});	
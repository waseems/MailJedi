var bootstrap = {
    init: function(event) {
        // Only run when navigating to gmail
        if (/mail\.google\.com/i.test(content.location.href)) {
            if (event.originalTarget instanceof HTMLDocument) {
                var win = event.originalTarget.defaultView;

                if (win.frameElement) {
                    if (win.frameElement.id == 'canvas_frame') {
                        // This is our gmail content frame. Inject our extension code into it
                        var doc = event.originalTarget;

                        bootstrap.appendScript(doc, 'resource://mailjedi/gslayer/lab.js');
                        bootstrap.appendScript(doc, 'resource://mailjedi/gslayer/gslayer-ff.js');
                        bootstrap.appendScript(doc, 'resource://mailjedi/gslayer/gslayer.js');
                        bootstrap.appendScript(doc, 'chrome://mailjedi/content/mailjedi.js');

                        bootstrap.appendStylesheet(doc, 'chrome://mailjedi/content/mailjedi.css');

                        // Test harness
                        bootstrap.appendScript(doc, 'resource://mailjedi/gslayer/test/test.js');
                    }
                }
            }
        }
    },
    appendScript: function(doc, filename) {
        var scriptElement = doc.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', filename);

        doc.body.appendChild(scriptElement);
    },
    appendStylesheet: function(doc, filename) {
        var linkElement = doc.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('type', 'text/css');
        linkElement.setAttribute('href', filename);

        doc.body.appendChild(linkElement);
    }
};

//
// Main entry point for our plugin
//
window.addEventListener("load", function () {
    gBrowser.addEventListener("DOMContentLoaded", bootstrap.init, true);
}, false);
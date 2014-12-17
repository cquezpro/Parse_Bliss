/**
 *  #BlissDocs
 * 
 *  Messaging Functionality for Bliss
 *
 *  Allows Radio / Subscriber pattern for sending messages across the application.  Right now just a simple wrapper for Chrome's messaging system
 *
 *
 **/

BlissMessage = {
  addListener: function(request, sender, sendResponse) {
    if (Bliss.getEnvironment() == 'chrome') {
      chrome.runtime.onMessage.addListener(request, sender, sendResponse);
    }
  },
  sendMessage: function(message) {
    if (Bliss.getEnvironment() == 'chrome') {
      chrome.runtime.sendMessage(message);
    }
  }
}




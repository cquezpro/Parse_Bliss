chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //Display message to the user
    if (request.action == "bliss-message") {
      Bliss.message(request.message);
    }
  }
);

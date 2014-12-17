function iframeView(view) {
  this.view   = view;
  this.id     = Bliss.getRandomString(10);
  
  this.deploy = function() {
    var url = Bliss.getLocalUrl('/ui/deploy/deploy.htm?exercise='+ this.view +'&iframe='+ this.id);
    console.log('URLLLLLL');
    console.log(url);
    $('body').append('<iframe src="'+ url  +'" id="bliss-iframe-view-'+ this.id +'" class="bliss-iframe-view"></iframe>');

    /** Chrome Storage is the ONLY method I've found to pass information between a chrome-extension frame
    /*  and the page the user is currently viewing (http or https)
    /*
    /* iframeRemover keeps checking for a Chrome Storage Variable to be set by the view in the iframe
    /* as a signal to remove the iframe */

    window.iframeId = this.id;
    var iframeRemover = setInterval(function() {
      var removeKey  = 'remove_iframe_view_' + window.iframeId;
      console.log(removeKey);
      var that = this;
      Storage.wrapper.get(removeKey, function(data) {
        if (data[removeKey]) {
          $('#bliss-iframe-view-'+ window.iframeId).remove();
          Storage.wrapper.remove(removeKey);
          clearInterval(iframeRemover);
        }
        console.log(data); 
      });
    }, 1000);
  }
}




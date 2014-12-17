function FileSystem() {
  var that = this;
  function onInitFs (fileSystem) {
    that.fileSystem = fileSystem;
    that.downloadFile('http://upload.wikimedia.org/wikipedia/commons/4/4f/Jennifer_Lawrence_at_the_83rd_Academy_Awards_crop.jpg', function(blob) {
      that.saveFile(blob, 'jlaw.jpg');
    });
  }
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, this.errorHandler);
}

FileSystem.prototype = {
  downloadFile: function(url, success) {
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', url, true); 
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4) {
        if (success) success(xhr.response);
    }
    };
    xhr.send(null);
  },
  saveFile: function(data, path) {
    this.fileSystem.root.getFile(path, {create: true}, function(fileEntry) {
      fileEntry.createWriter(function(writer) {
        writer.write(data);
      }, this.errorHandler);
    }, this.errorHandler);
  },
  errorHandler: function (e) {
    var msg = '';

    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
      default:
        msg = 'Unknown Error';
        break;
    };

    console.log('Error: ' + msg);
  }
}

  new FileSystem();



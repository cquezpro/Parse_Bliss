  //Storage is defined as a literal, using the Singleton pattern (We would never want more than 1 instance of Storage)
  //
  //Storage encapsulates chrome.storage - so that we can possibly change storage methods
  //Functionality has been added to change to chrome storage container if the user gets an error writing to chrome sync storage
  //(Chrome sync storage can blacklist users for extended periods of time, requiring a fallback)
  //
  //Platforms - iOS, Web based, Android, Firefox, etc.
  //
  // To use Storage, you must first call Storage.loadAll(function(){... 
  // Storage then loads all data from Chrome Storage, and you can retrieve data using Storage.get
  // i.e.  var username = Storage.get('username');
  //
  // The point of this approach is to avoid nested callbacks, since once you load all data, you can get any variable without an ansynchronos call requiring a callback.
  // It does have it's drawbacks, and may be revisited at some point.
  //
  //
  //
  
  /**
   * TODO: Add ability to fall back on localStorage or Parse.com Storage if Chrome Storage is not available
   *       Remove addprefix functionality is possible based on above implementation
   */
  Storage = {
    /**
     *  @callback - a function to be called when Chrome storage has been loaded
     *  TODO: Refactor to only load from Storage once
     */
    reload: function(callback) {
      Storage.loadAll(callback, true);
    },
    loadAll: function(callback, reload) {
      if (Storage.loaded && !reload) {
        callback.call(null, Storage.container);
        return;
      }
      else {
        Storage.onLoadCallbacks.push(callback);
      }
      if (!Storage.loading) {
        Storage.loading = true;
        Storage.container = {};
        //Load all variables from Chrome Storage
        if (Bliss.getEnvironment() == 'chrome') {
          Storage.wrapper.get(null, function(variables) {
            Storage._loadAll(variables, callback);
            Bliss.log('Storage loaded from Chrome');
            Storage.setLoaded();
          });
        }
        /**
        else if (Bliss.getEnvironment() == 'phonegap') {
          //Just get *all* values stored in table
          // (I can refactor later for efficiency)

          variables = {name: 'John', age: 23} //Object with all values loaded
        
          Storage._loadAll(variables, callback); //loadAll caches 'variables' in Storage.container object for easy retrieval
          Bliss.log('Storage loaded from Chrome');
          Storage.setLoaded();
        }
        */
        //Fall back on localStorage
        //TODO: Refactor to use Parse.com - localStorage can be cleared and we'll lose settings and split tests
        else if (localStorage) {
          var container_name = this.getContainerName();
          var variables      = localStorage[container_name] ? JSON.parse(localStorage[container_name]) : {};
          Storage._loadAll(variables, callback);
        }
        Storage.loading = false;
      }
    },
    //Copy variables to our Storage.container static variable
    _loadAll: function(variables, callback) {
      $.each(variables, function(key, value) {
        Storage.container[key] = Storage.boolCheckWrite(value); 
      });
      Storage.setLoaded();
    },
    //We set container name so that dev install does not conflict with prod install
    getContainerName: function() {
      return Bliss.dev == true ? 'bliss-dev-storage' : 'bliss-storage';
    },
    getStorageMethod: function(callback) {
      if (Storage.storage_method) {
        callback.call(null, Storage.storage_method);
      }
      else {
        chrome.storage.local.get('storage_method', function(data) {
          Storage.storage_method = data.storage_method ? data.storage_method : 'sync';
          callback.call(null, Storage.storage_method);
        });
      }
    },
    onLoadCallbacks: [],
    /**
     *  @callback - a function to run after Storage is loaded
     */
    onLoad: function(callback) {
      if (Storage.loaded) {
        callback.call(null);
      }
      else {
        Storage.onLoadCallbacks.push(callback);
      }
    },
    setLoaded: function() {
      console.log('storage loaded');
      Storage.loaded = true;
      Storage.runOnLoadCallbacks();
    },
    runOnLoadCallbacks: function() {
      for (x = 0; x < Storage.onLoadCallbacks.length; x++) {
        callback = Storage.onLoadCallbacks.shift();
        callback.call(null, Storage.container);
      }
    },
    /**
     *  @variables - a string of the variable to retrieve i.e. 'username', or an array of variables to retrieve i.e. ['username', 'pass', 'bliss_version'] 
     *  @callback  - function to call with the retrieved value, or object in the form {username: 'heydemo', pass: 'notmyrealpass'}
     */
    get: function(variables, callback) {
      if (!Storage.loaded) {
        if (!callback) {
          throw new Error('Attempted to call Storage.get before Storage.loadAll use Storage.onLoad to ensure storage has been loaded before calling Storage.get');
        }
        else {
          Storage.loadAll(function(data) {
            callback.call(null, data);
          });
        }
      }
      singleVariable = (typeof(variables) == 'string');
      if (singleVariable) {
        var variable = Storage.container[variables];
        variable = Storage.boolCheckRead(variable);
        if (typeof variable != 'undefined') {
          Bliss.log('Retrieved singleVariable '+ variables +' from Storage.container with value: '+ variable);
        }
        if (callback) {
          callback.call(null, variable);        
        }
        return variable;
      }
      else {
        variables = {}
        $.each(Storage.container, function(key, value) {
          variables[key] = Storage.boolCheckRead(value);
        });
        if (callback) {
          callback.call(null, variables);
        }
        return variables;
      }
  },
  /**
   *  Set the value of a variable or variables
   *  @variable - a string for the name of the variable, or object of variables in the form {username: 'myuser', password: 'mypass'}
   *  @value    - value to set, used on for a single variable 
   */
  set: function(variable, value, callback) {
    var that = this;
    var obj = {};
    if (typeof(variable) == 'string' || typeof(variable) == 'number') {
      obj[variable] = value;  
    }
    else {
      obj = variable;
    }
    //Write values to Storage.container variable
    if (typeof(variable) == "object") {
      $.each(variable, function(key, value) {
        Storage.container[key] = Storage.boolCheckWrite(value);
        Bliss.log('Storage.container set '+ key +' to '+ value);
      });
    }
    else {
      Storage.container[variable] = Storage.boolCheckWrite(value);
      Bliss.log('Storage.container set '+ variable +' to '+ value);
    }  

    // chrome.runtime.sendMessage({action: "storage_set", vars: obj});
    // Handle long term saving of data via chrome.storage or localStorage
    if (Bliss.getEnvironment() == 'chrome') {
      Storage.wrapper.set(obj, callback);
    }
    /**
     * else if (Bliss.getEnvironment() == 'phonegap') {
     *  Write values of 'obj' to database
     *  obj is an object of key / value data to save (value is string, number, or object)
     *
     *  Example of obj:
     *  { 
     *    'string' => 'value',                         //String          
     *    'anotherstring' => 34,                       //Number
     *    'record' => {stuff: 'thing', color: 'blue'}  //Object
     *  }
     *  
     *  The table could be 
     *  key    | value  | dataType
     *
     *  name   | 'john' | 'string' 
     *  age    | '42'   | 'number' 
     *  record | '{}'   | 'object'   // If object use JSON.stringify to encode value
     * }
     */
    else if (localStorage) {
      this.writeLocalStorage();
      if (that.callback) {
        that.callback(null, obj);
      }
    }
  },
  //Save our Storage container params to localStorage
  writeLocalStorage: function() {
    var container_name = this.getContainerName();
    localStorage[container_name] = JSON.stringify(Storage.container);
  },
  //Force Storage.container to respect booleans
  boolCheckWrite: function(value) {
    if (value === false) {
      return 'BLISS_FALSE';
    }
    if (value === true) {
      return 'BLISS_TRUE';
    }
    return value;
  },
  boolCheckRead: function(value) {
    if (value == 'BLISS_FALSE') {
      return false;
    }
    if (value == 'BLISS_TRUE') {
      return true;
    }
    return value;
  },
  /**
   * Deletes a variable
   * @variable - string of the variable name to remove from storage
   */
  remove: function(variable) {
    if (Bliss.getEnvironment() == 'chrome') {
      Storage.wrapper.remove(variable, function() {
        if (chrome.runtime.lastError) {
          Bliss.log(chrome.runtime.lastError);
          Bliss.logError(chrome.runtime.lastError, 'chrome_storage_remove');
        }
        else {
          Bliss.log('Deleted variable '+ variable +' from chrome.storage');
        }
      });
    }
    /**
    else if (Bliss.getEnvironment() == 'phonegap') {
      remove row with key of 'variable'
    }
    */
    else if (localStorage) {
      delete Storage.container[variable];
      this.writeLocalStorage();
      Bliss.log('Deleted variable '+ variable +' from Storage.container');
    }
  },
  /**
   * Deletes all variables
   */
  clear: function(callback) {
    Bliss.log('Clearing storage container');
    Storage.container = {};
    if (Bliss.getEnvironment() == 'chrome') {
      Bliss.log('Clearing chrome storage');
      chrome.storage[method].clear(callback);
    }
    else if (localStorage) {
      Storage.container = {};
      this.writeLocalStorage();
    }
  },
  //Copy chrome.storage[method] to chrome.storage.local
  copySyncToLocal: function(callback) {
    chrome.storage.sync.get(null, function(data) {
      chrome.storage.local.set(data, function(data) {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
          Bliss.logError(chrome.runtime.lastError, 'chrome_storage_copy_to_local');
        }
        else {
          callback.call(null);
        }
      });
    });
  },
  setStorageMethod: function(method, callback) {
    Storage.storage_method = method;
    chrome.storage.local.set({'storage_method': method}, function(){
      callback.call(null);  
    });
  },
  /**
   * Wrapper for Chrome Storage functions
   **/
  wrapper: {
    get: function(arg, callback) {
      Storage.getStorageMethod(function(method) {
        chrome.storage[method].get(arg, function(data) {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
            Bliss.logError(chrome.runtime.lastError, 'chrome_storage_get');
          }
          callback.call(null, data);
        });
      });
    },
    set: function(items, callback) {
      //getStorageMethod is required to flexibly use either chrome local or chrome sync storage 
      Storage.getStorageMethod(function(method) {
        chrome.storage[method].set(items, function(data) {
          if (chrome.runtime.lastError && method == 'sync') {
            //Move to chrome storage container because we've been blacklisted!
            Storage.setStorageMethod('local', function(){
              Storage.copySyncToLocal(function() {
                //Re-run our storage set call with new method
                Storage.set(items, callback);  
              });
            });
            console.log(chrome.runtime.lastError);
            Bliss.logError(chrome.runtime.lastError, 'chrome_storage_set');
          }
          if (callback) {
            callback.call(null, data);
          }
        });
      });
    },
    remove: function(item, callback) {
      Storage.getStorageMethod(function(method) {
        chrome.storage[method].remove(item, callback);
      });
    },
    clear: function(callback) {
      Storage.getStorageMethod(function(method) {
        chrome.storage[method].clear(callback);
      });
    }
  },
  container: {},
}

/**
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'storage_set') {
      $.each(obj, function(key, value) {
        Storage.container[key] = value;
        console.log('Storage onMessage: ' + key + ': '+ value);
      });
    }
});
*/


window.Storage = Storage

Parse.initialize(Bliss.appId, Bliss.javascriptId);
$(document).ready(function(){
  new User(function(user) {
    if (!user) {
      var form = new LoginForm();
      form.onComplete(function() {
        //document.location  
      });
      form.deploy();
      return;
    }
    function loadCollections(callback) {
      var trainer = new Trainer();
      trainer.onLoad(function(){
        exercises = trainer.getExercises();
        //loadCount keeps track of how many Collections are loading
        //Start at 1 because we must finish our loop before loading can be considered complete
        var loadCount = 1;
        var collectionCount = 0;
        var loaded = false;
        var collections = [];
        $.each(trainer.getExercises(), function(key, exercise) {
          if (exercise.normal_exercise) {
            loadCount++;
            var collection  = new ParseCollection(exercise.dataClass);
            collection.display_name = exercise.display_name;
            collection.load(function(){
              loadCount--;
              collections.push(collection);
              if (loadCount == 0) {
                loaded = true
                callback.call(null, collections);
              }
            });
          }
        });
        //Decrement loadCount, now that we've finshed looping
        loadCount--;
        if (loadCount == 0) {
          loaded = true
          callback.call(null, collections);
        }
      });
    }

    function sortCollections(collections) {
      collections.sort(function(a, b){
        //If models both have zero entries, sort alphabetically
        if ((a.length() == 0 && b.length() == 0) || (a.length() > 0 && b.length() > 0)) {
          return a.display_name == b.display_name ? 0 : +(a.display_name > b.display_name) || -1;
        }
        else {
          return a.length() > b.length() ? 0 : 1;
        }
      });
    }

    function displayCollections(collections) {
      //Show first collection as expanded
      var viewport = viewportChecker();

      tabExpander();
      $.each(collections, function(key, collection) {
        var expanded = (key == 0);
        var view = new ExerciseTab(collection.display_name, collection, '#exercise-tab-container .exercise-inner', {expanded: expanded}); 
        view.deploy();
        first_view = (key == 0) ? view : first_view;
      });

      if(viewport > 1024){
          first_view.onLoad(function() {
            first_view.deployExercise();
          });
      
      }

    }


    loadCollections(function(collections) {
      sortCollections(collections);
      displayCollections(collections);
    });

    function tabExpander(){
    
    $('.exerciseExpander').click(function(e){
        e.preventDefault();
        $('.exercise-inner').toggleClass('expanded');
    });

  }
    

  function viewportChecker(){

        var viewportwidth;

        
       // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        
       if (typeof window.innerWidth != 'undefined')
       {
            viewportwidth = window.innerWidth;
       }
        
      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
       
       else if (typeof document.documentElement != 'undefined'
           && typeof document.documentElement.clientWidth !=
           'undefined' && document.documentElement.clientWidth != 0)
       {
             viewportwidth = document.documentElement.clientWidth;

       }
        
       // older versions of IE
        
       else
       {
             viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
       }

       return viewportwidth;

  }

  });
});



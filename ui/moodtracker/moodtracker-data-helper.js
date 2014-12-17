var MoodTrackerDataHelper = function() {
    /**
     * Initialization of required objects.
     */
    this._moodTracker = Parse.Object.extend("MoodTracker");
    this._query = new Parse.Query(this._moodTracker);

    /**
     * Find the mood tracker objects.
     * 
     * @param {type} options js object e.g. {success:function(results){},error:function(error){}}
     * @returns null
     */
    this.find = function(options) {
        this._query.find(options);
    };
    
    /**
     * Get all mood tracker object.
     * @param {type} callback function with parameter data and error
     * 
     */
    this.getAllTrackers = function(callback){
        this.find({
            success : function(trackers){
                if(callback){

                    var data = [];

                    for(i=0;i < trackers.length;i++){
                        var timestamp = trackers[i].get('submitted');
                        if(timestamp){
                            data.push(trackers[i]);
                        }
                    }

                    callback(data);
                }

            },
            error:function(error){
                callback([],error);
            }
        });
    };

    /**
     * Get the tracker objects by date.
     * 
     * @param {type} options must contain date object, e.g. {date:'2014-08-01'}
     * @param {type} callback returns function(results,error){}
     *               results is the collection of MoodTracker object.
     */
    this.getTrackersByDate = function(options,callback){
      var start_date = new Date(options.date);
      var end_date = new Date(options.date);
      start_date.setHours(0,0,0,0);
      end_date.setHours(23,59,59,9);
      
      this.getTrackersByDateRange({startDate:start_date,endDate:end_date},callback);
    };
    
    /**
     * Get the tracker object by the given range of date.
     * The options first param is required.
     * 
     * @param {type} options js object with properties, e.g {startDate:'2014-08-01',endDate:'2014-08-81'}
     * @param {type} callback returns function(results,error){},
     *               results is the collection of MoodTracker object.
     */
    this.getTrackersByDateRange = function(options, callback) {
        var _start_date = new Date(options.startDate);
        var _end_date = new Date(options.endDate);
        
        this.find({
            success: function(rs) {
                var data = [];
                for (i = 0; i < rs.length; i++) {
                    var timestamp = rs[i].get('submitted');
                    if (timestamp) {
                        var submitted = new Date(timestamp * 1000);
                        if(submitted >=_start_date && submitted <= _end_date){
                            data.push(rs[i]);
                        }
                    }
                }
                callback(data,[]);
            },
            error: function(error) {
                callback([],error);
            }}
        );
    };
    
    /**
     * Get MoodTracker by month.
     * @param {type} options js object with properties, e.g {year:2014,month:1}
     * @param {type} callback callback returns function(results,error){},
     *               results is the collection of MoodTracker object.
     * @returns empty
     */
    this.getTrackerByMonth = function(options,callback){
        if(!options){
            Bliss.log("Options parameter required.");
        }
        if(options.year == undefined){
            Bliss.log("Year required!");
            callback([],"Year Required");
        }
        if(options.month == undefined){
            Bliss.log("Month required!");
            callback([],"Month Required");
        }
        
        this.find({
            success: function(rs) {
                var data = [];
                for (i = 0; i < rs.length; i++) {
                    var timestamp = rs[i].get('submitted');
                    if (timestamp) {
                        var submitted = new Date(timestamp * 1000);
                        
                        if(submitted.getFullYear() == options.year && submitted.getMonth() == options.month){
                            data.push(rs[i]);
                        }
                    }
                }
                callback(data,[]);
            },
            error: function(error) {
                callback([],error);
            }}
        );
    };
    
    /**
     * Get mood by date given.
     * The first param option is required.
     * 
     * @param {type} options js object with date properties, e.g. {date:'2014-08-01'}
     * @param {type} callback returns function(results,error){}
     *               results is the collection of MoodTracker object.
     */
    this.getMoodByDate = function(options, callback) {
        var start_date = new Date(options.date);
        var end_date = new Date(options.date);
        
        /**
         * Reset the date.
         */
        start_date.setHours(0, 0, 0, 0);
        end_date.setHours(23, 59, 59, 9);

        this.getMoodByDateRange({startDate: start_date, endDate: end_date},callback);
    };
    
    /**
     * Get the mood by range.
     * @param {type} options start_date,end_date e.g. {startDate:'2014-08-01',endDate:'2014-08-10'}
     * @param {type} callback returns function(results,error){}
     *               results is the collection of MoodTracker object.
     */
    this.getMoodByDateRange = function(options, callback) {
        this.getTrackersByDateRange(options,
        function(results, error) {
            var data = [];
            for (i = 0; i < results.length; i++) {
                data.push(results[i].get('happiness'));
            }
            if (callback) {
                callback(data,error);
            }
        });
    };
    
    this.getMoodByMonth = function(options,callback){
        this.getTrackerByMonth(options,function(trackers,error){
            var data = [];
            for(i = 0;i < trackers.length;i++){
                data.push(results[i].get('happiness'));
            }
            if (callback) {
                callback(data,error);
            }
        });
    };
};


//Load Google Charts
google.load("visualization", "1", {packages:["corechart"]});

User(function() {
  var picker;
  google.setOnLoadCallback(function() {
    picker = new datePicker('month', '#date-selector', moodChart);
  });

  $(document).ready(function(){
    $('#chart-type-selector select').change(function(e) {
      var time_period = $(this).val();
      picker = new datePicker(time_period, '#date-selector', function(start_date, end_date) {
        moodChart(start_date, end_date, time_period);
      });
    });
  });

});

/**
 * Get trackers from parse
 * @options
 *   startDate: starting date of time period from which to pull
 *   endDate: end date of time period from which to pull
 */

function getTrackers (options, callback) {
  var trackers = new ParseCollection('MoodTracker', {startDate: options.startDate, endDate: options.endDate});
  trackers.load(function(success) {
    if (success) {
      callback.call(null, trackers.getCollection());
    }
  });
}

/**
 * Given an array of mood tracker models return an array of arrays in the form:
 * [[date, happiness], [date, happiness]...]
 *
 * date - Date obj
 * happiness - integer 1-10
 */
function getMoodArray(trackers) {
  var mood_array = [];
  $.each(trackers, function(key, tracker){
    var date = tracker.createdAt;
    var mood = tracker.get('happiness');
    mood_array.push([date, mood]);
  });
  mood_array.unshift(['Date', 'Happiness']);
  return mood_array;
}

//Get Maximum and Minimum values of a property containing a date from an array of models
function getMaxMinDates(models, propname) {
  var max, min;
  console.log(models);
  $.each(models, function(key, model) {
    if (typeof model.get(propname) == 'object') {
      datetime = model.get(propname).getTime();
      if (typeof min == 'undefined') {
        min = datetime;
        max = datetime;
      }
      max = (datetime > max) ? datetime : max;
      min = (datetime < min) ? datetime : min;
    }
  });

  return {min: min, max: max};

}

function trackerTestData () {
  var collection = new ParseCollection('MoodTracker');
  var now = new Date().getTime();
  mintime = now - (24 * 60 * 60 * 1000 * 42);
  var date;
  for (x=0; x < 120; x++) {
    time = Bliss.getRandomInt(mintime, now);
    happiness = Bliss.getRandomInt(8, 10);
    date = new Date(time);
    collection.addModel({createdDate: date, happiness: happiness});
  }
  collection.saveAll();
}

function moodChart(start_date, end_date, time_period) {
  getTrackers({startDate: start_date, endDate: end_date}, function(trackers) {
    if (trackers.length > 0) {
      var mood_array = getMoodArray(trackers);
      var format = time_period == 'week' ? 'EEEE' : 'LLL d';
      drawChart('chart-container', mood_array, {hAxis: {min: start_date, max: end_date, format: format}, vAxis: {minValue: 0, maxValue: 10}});
    }
    else {
      $('#chart-container').html('<h1 class="no-data">You have no trackers for the selected dates</h1>');
    }
  });
}

function drawChart(target_id, data, options) {
  var start = moment(options.hAxis.min);
  var end   = moment(options.hAxis.max);


  var defaults = {
    chartArea: {'width': '90%', 'height': '80%'},
    hAxis: { title: '', 
             minValue: start.toDate(), 
             maxValue: end.toDate(),
  //             format: 'LLL d',
          },
    vAxis: {minValue: 0, maxValue: 10},

    legend: 'none'
  }; 

  options = $.extend(defaults, options);


  //TODO: check out https://developers.google.com/chart/interactive/docs/customizing_axes
  // To fix the X axis labels
  var chart = new google.visualization.ScatterChart(document.getElementById(target_id));
  data  = google.visualization.arrayToDataTable(data);
  chart.draw(data, options);
}

/**
 *  Sets up a weekpicker, executes callback on user selection
 *  @time_period - either 'month' or 'week'
 *  @target - the DOM element to target for date select
 *  @callback - Callback function in the form function(start_date, end_date) {
 */
function datePicker(time_period, target, callback) {
  this.time_period = time_period;
  //Format which datePicker expects from widget
  this.dateParseFormat = (this.time_period == 'week') ? 'MM/DD/YY' : 'MM/YYYY';
  this.dateDisplayFormat = (this.time_period == 'week') ? 'ddd, MMM Do, YYYY' : 'MMMM, YYYY';
  this.target   = target;
  this.callback = callback;
  this.start_date = moment().startOf(this.time_period);
  this.end_date   = moment(this.start_date).add('1', this.time_period);
  this.load(function() {
    this.callback.call(null, this.start_date.toDate(), this.end_date.toDate());
  });
}
datePicker.prototype = {
  load: function(callback) {
    var that = this;
    var template_url = Bliss.getLocalUrl('ui/moodtracker/datePicker.ejs');
    $.get(template_url, function(html) {
      that._template = html;
      that.render();
      callback.call(that);
    });
  },
  render: function() {
    var that = this;
    var display_date = this.start_date.format(this.dateDisplayFormat);
    if (this.time_period != 'month') {
      display_date += ' - ' + this.end_date.format(this.dateDisplayFormat);
    }
    var html   = new EJS({text: this._template}).render({display_date: display_date});
    $(this.target).html(html);
    $(this.target +' .prev').click(function() { that.prev() });
    $(this.target +' .next').click(function() { that.next() });
    $(this.target +' .weekpicker-dates').click(function() { 
      $(this).replaceWith('<input type="text" />')
      that.initWidget();
      setTimeout(function() {
      $(that.target +' input').focus().blur(function() { that.render(); });
      }, 5);
    });
  },
  initWidget: function() {
    this.time_period == 'week' ? this.initWeekWidget() : this.initMonthWidget();
  },
  initWeekWidget: function() {
    var that = this;
    $(this.target +' input').weekpicker({months: 2});

    $(this.target +' input').on('change', function() {
      that.widgetChangeHandler.call(that, this);
    });
  },
  initMonthWidget: function() {
    var that = this;
    $(this.target +' input').monthpicker()

    $(this.target +' input').bind('monthpicker-click-month', function(e, month) {
      that.widgetChangeHandler.call(that, e.currentTarget);
    });
    //Re-render dates if user closes without selecting a date
    $(this.target +' input').bind('monthpicker-hide', function(e, month) {
      that.render();
    });
  },
  widgetChangeHandler: function(input) {
    var dates      = $(input).val().split('-');
    var start_date = dates[0];
    var end_date   = dates[1] ? dates[1] : false;

    this.start_date = moment(start_date, this.dateParseFormat).startOf('day');

    //If widget provides an end date, use this, otherwise
    //Set end date to one time period after start date
    if (end_date) {
      this.end_date = moment(dates[1], this.dateParseFormat).endOf('day');
    }
    else {
      this.end_date = moment(this.start_date).add('1', this.time_period);
    }

    this.executeCallback();
    this.render();
  },
  removeWidget: function() {
    if (this.time_period == 'week') {
      $('.weekpicker').remove();
    }
  },
  executeCallback: function() {
    this.callback.call(null, this.start_date.toDate(), this.end_date.toDate());
    this.removeWidget();
    this.initWidget();
  },
  prev: function() {
    this.start_date.subtract(1, this.time_period); 
    this.end_date.subtract(1, this.time_period); 
    this.render();
    this.executeCallback();
  },
  next: function() {
    this.start_date.add(1, this.time_period); 
    this.end_date.add(1, this.time_period); 
    this.render();
    this.executeCallback();
  }

}





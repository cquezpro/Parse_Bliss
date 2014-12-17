Parse.initialize(Bliss.appId, Bliss.javascriptId);

var mood = null;
User(function() {

    //Load Google Charts
    google.load("visualization", "1", {
        packages: ["corechart"]
    });
    google.setOnLoadCallback(function() {
        $('#page').show();
        mood = new MoodTrackerDataHelper();

    });

    $(function() {

        $('#view-data-select').on('change', function() {
            var selectedValue = $(this).val();

            console.log('selected value:' + selectedValue);

            //reset
            $('.weekpicker').remove();
            $('#selected-date').monthpicker('destroy');
            //$('#selected-date').unbind('change');

            if (selectedValue == 1) { // Day Of Week
                $('#selected-date').hide();
                showByDayOfWeek();

            } else if (selectedValue == 2) { // month
                $('#selected-date').show()
                        .monthpicker();
            } else if (selectedValue == 3) { // week
                $('#selected-date').show();
                $('#selected-date').weekpicker({
                    months: 1
                });
            }
        });

        //get the selected value
        $('#selected-date').on('change', function() {
            var selectedValue = $('#view-data-select').val();

            if (selectedValue == 1) { // day

            } else if (selectedValue == 2) { // Month
                showByMonth();
            } else if (selectedValue == 3) { // Week
                showByWeek();
            }

        });

        //trigger default
        $('#view-data-select').trigger('change');

    });


    function showByDayOfWeek() {
        console.log('show day of week');
        var start = moment().day(0);
        var end = moment().day(6);
        var options = {
            hAxis: {
                minValue: start.toDate(),
                maxValue: end.toDate(),
                format: 'EEEE'
            },
            vAxis: {
                minValue: 0,
                maxValue: 10
            },
            legend: 'none'
        };

        mood = mood || new MoodTrackerDataHelper();
        mood.getAllTrackers(function(data) {
            console.log(data);
            var _data = [];

            for (i = 0; i < data.length; i++) {
                var dte = new Date(data[i].get('submitted') * 1000);

                _data.push([dte, data[i].get('happiness')]);
            }

            //average by day of week
            var outputData = [];
            var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            $.each(weekDays, function(i, weekDay) {
                var average = 0;
                var ctr = 1;

                //Sum trackers by weekday
                $.each(_data, function(index, val) {
                    var day = moment(val[0]).format('ddd');
                    var happiness = val[1];

                    if (weekDay == day) {
                        average += happiness;
                        ctr++;
                    }
                });

                //Get the average
                average /= ctr;
                outputData.push([weekDay, average]);
            });


            if (_data) {
                //Add title of the rows
                outputData.unshift(["Weekdays", "Happiness"]);


                //View the data
                var d = google.visualization.arrayToDataTable(outputData);
                drawChart('chart_div', 'column-chart', d, options);
            }

        });
    }

    function showByWeek() {
      return;
        console.log('show by week');

        var date = $('#selected-date').val();

        console.log('week selected');
        console.log(date);

        if (date) {

            //Split the date by "-"
            var splittedDate = date.split('-');
            var startDate = splittedDate[0];
            var endDate = splittedDate[1];

            mood.getTrackersByDateRange({
                startDate: startDate,
                endDate: endDate
            }, function(rs, error) {
                console.log('rsult from');
                console.log(rs);

                if (rs) {
                    var start = moment(startDate, 'MM/DD/YY');
                    var end = moment(endDate, 'MM/DD/YY');

                    var options = {
                        title: 'Mood Tracker (' + start.format('MMMM Do') + ' - ' + end.format('MMMM Do, YYYY') + ')',
                        hAxis: {
                            title: '',
                            minValue: start.toDate(),
                            maxValue: end.toDate(),
                            format: 'EEE'
                        },
                        vAxis: {
                            title: 'Happiness',
                            minValue: 0,
                            maxValue: 10
                        },
                        legend: 'none'
                    };


                    var data = [];

                    for (i = 0; i < rs.length; i++) {
                        data.push([new Date(rs[i].get('submitted') * 1000), rs[i].get('happiness')]);
                    }
                    //add Header
                    data.unshift(['Time', 'Hapiness']);
                    showChart(data, 'gchart-scatter', options);

                }
            });

        } else {
            Bliss.log("Date is empty!");
        }

    }


    function showByMonth() {

        console.log('show by month');
        var monthDate = $('#selected-date').monthpicker('getDate');
        console.log('selected month');
        console.log(monthDate);

        mood = mood || new MoodTrackerDataHelper();

        if (mood) {
            mood.getTrackerByMonth({year: monthDate.getFullYear(), month: monthDate.getMonth()},
            function(rs, error) {

                console.log('rs');
                console.log(rs);

                var start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
                var end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);

                start.setDate(1);
                end.setDate(0);

                console.log('start');
                console.log(start);
                console.log('end');
                console.log(end);

                var options = {
                    title: 'Mood Tracker (' + moment(end).format('MMMM YYYY') + ')',
                    hAxis: {
                        title: '',
                        minValue: start,
                        maxValue: end,
                        format: 'd'
                    },
                    vAxis: {
                        title: 'Happiness',
                        minValue: 0,
                        maxValue: 10
                    },
                    legend: 'none'
                };


                var data = [];
                for (var i = rs.length - 1; i >= 0; i--) {
                    var dte = new Date(rs[i].get('submitted') * 1000);
                    data.push([dte, rs[i].get('happiness')]);
                }
                ;

                if (data) {
                    data.unshift(['Submitted', 'Happiness']);
                    showChart(data, 'gchart-scatter', options);
                }
            });
        }

    }

    function showChart(data, type, options) {
        var visualData = google.visualization.arrayToDataTable(data);
        drawChart('chart_div', type, visualData, options);
    }
});

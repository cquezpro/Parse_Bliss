function drawChart(canvas_id, type, data, options) {
    /**
     * Validate parameters.
     */
    if (!canvas_id || canvas_id == undefined) {
        Bliss.log("canvas_id is empty!");
        return;
    }
    if (!type || type == undefined) {
        Bliss.log("type is empty!");
        return;
    }
    if (!data || data == undefined) {
        Bliss.log("data is empty!");
        return;
    }
    if (!options || options == undefined) {
        Bliss.log("options is empty!");
        return;
    }

    /**
     * Prameters are valid then let's load Google Charts.
     */
    console.log('called');
    var canvasViewerElement = document.getElementById(canvas_id);
    var chart = null;

    console.log('type');
    console.log(type);

    switch (type) {
        case "gchart-scatter":
            chart = new google.visualization.ScatterChart(canvasViewerElement);
            break;
        case "gchart-calendar":break;
        case "scatter":break;
        case "column-chart":
            chart = new google.visualization.ColumnChart(canvasViewerElement);
            break;
        case "bar-chart":
            chart = new google.visualization.Histogram(canvasViewerElement);
            break;
    }
    Bliss.log('chart');
    Bliss.log(chart);

    /**
     * Draw the chart.
     */
    chart.draw(data, options);
}
